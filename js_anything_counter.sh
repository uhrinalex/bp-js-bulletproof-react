#!/bin/bash

# Spustenie ESLintu a získanie výstupu vo formáte JSON
output=$(npx eslint src/ --format=json)

# Spojenie všetkých čísel výstupu
total_any=$(echo "$output" | jq '.[].messages | map(select(.ruleId == "jsdoc/require-description")) | length' | awk '{s+=$1} END {print s}')

# Vypísanie celkového počtu výskytov
echo "Celkový počet výskytov typu vo všetkých súboroch: $total_any"
