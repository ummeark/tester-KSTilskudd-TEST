#!/bin/bash
# Kjører alle seks tester parallelt og oppdaterer progress-siden underveis.
# Kalles av skill (etter at init og open allerede er kjørt) og av run-rapport-lokalt.sh.
# Output fra hver test fanges til /tmp/kjoer-<id>.txt — ingen interleaving i terminalen.

cd "$(dirname "$0")"

kjoer() {
  local id="$1" npm_cmd="$2" grep_pat="$3"
  local tmp="/tmp/kjoer-${id}.txt"
  node testkjoring.js kjorer "$id"
  if npm run "$npm_cmd" > "$tmp" 2>&1; then
    local INFO
    INFO=$(grep -oE "$grep_pat" "$tmp" | head -1 | sed 's/\x1B\[[0-9;]*m//g' | xargs)
    node testkjoring.js ferdig "$id" "${INFO:-Ferdig}"
    echo "✅ $id ferdig"
  else
    node testkjoring.js feil "$id" "Feilet"
    echo "❌ $id feilet"
  fi
}

kjoer_brukerhistorie() {
  local tmp="/tmp/kjoer-brukerhistorie.txt"
  node testkjoring.js kjorer brukerhistorie
  if npm run brukerhistorie > "$tmp" 2>&1; then
    local PASSED FAILED INFO
    PASSED=$(grep -o "[0-9]* passed" "$tmp" | tail -1 | sed 's/\x1B\[[0-9;]*m//g' | xargs)
    FAILED=$(grep -o "[0-9]* failed" "$tmp" | tail -1 | sed 's/\x1B\[[0-9;]*m//g' | xargs)
    INFO="${PASSED}${FAILED:+ · $FAILED}"
    node testkjoring.js ferdig brukerhistorie "${INFO:-Ferdig}"
    echo "✅ brukerhistorie ferdig"
  else
    node testkjoring.js feil brukerhistorie "Feilet"
    echo "❌ brukerhistorie feilet"
  fi
}

kjoer rapport    rapport   "WCAG-brudd:.*"           &
kjoer monkey     monkey    "Kritiske funn:.*"         &
kjoer sikkerhet  sikkerhet "Score:[ \t]*[0-9]+/[0-9]+" &
kjoer negativ    negativ   "Score:[ \t]*[0-9]+/[0-9]+" &
kjoer ytelse     ytelse    "Score: [0-9]+/[0-9]+"    &
kjoer_brukerhistorie                                  &

wait
echo ""
echo "Alle tester fullført."
