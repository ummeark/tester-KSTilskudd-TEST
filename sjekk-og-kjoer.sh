#!/bin/bash
# Kjøres hvert 10. minutt (08:00–10:50) av launchd via StartCalendarInterval.
# Starter alle seks tester hvis de ikke allerede er kjørt i dag.

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
DATO=$(date +%Y-%m-%d)
LOG_FIL="$REPO_DIR/rapporter/kjoring.log"

mkdir -p "$REPO_DIR/rapporter"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🔄 sjekk-og-kjoer startet av launchd" >> "$LOG_FIL"

# Bare hverdager (1=Man ... 5=Fre)
UKEDAG=$(date +%u)
if [ "$UKEDAG" -gt 5 ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] 📅 Helg – hopper over" >> "$LOG_FIL"
  exit 0
fi

# Allerede kjørt i dag? Sjekk alle seks resultatfiler.
if [ -f "$REPO_DIR/rapporter/$DATO/resultat.json" ] && \
   [ -f "$REPO_DIR/rapporter/$DATO/monkey-resultat.json" ] && \
   [ -f "$REPO_DIR/rapporter/$DATO/sikkerhet-resultat.json" ] && \
   [ -f "$REPO_DIR/rapporter/$DATO/negativ-resultat.json" ] && \
   [ -f "$REPO_DIR/rapporter/$DATO/ytelse-resultat.json" ] && \
   [ -f "$REPO_DIR/brukerhistorie-resultater/brukerhistorie-resultat.json" ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ Allerede kjørt i dag – hopper over" >> "$LOG_FIL"
  exit 0
fi

# Er nettstedet tilgjengelig?
STATUS=$(curl -s --max-time 10 -o /dev/null -w "%{http_code}" "https://tilskudd.fiks.test.ks.no/" || echo "000")
if [[ ! "$STATUS" =~ ^[23] ]]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⏳ Nettstedet ikke tilgjengelig (HTTP $STATUS) – prøver igjen om 10 min" >> "$LOG_FIL"
  exit 0
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🚀 Starter tester (ikke kjørt i dag)" >> "$LOG_FIL"
exec "$REPO_DIR/run-rapport-lokalt.sh"
