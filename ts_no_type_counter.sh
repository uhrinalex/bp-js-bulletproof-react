#!/bin/bash

# Spustenie ESLintu a získanie výstupu vo formáte JSON
output=$(npx eslint src/ --format=json)

# Spojenie všetkých čísel výstupu
total_any=$(echo "$output" | jq '.[].messages | map(select(.ruleId == "@typescript-eslint/no-inferrable-types")) | length' | awk '{s+=$1} END {print s}')

# Vypísanie celkového počtu výskytov
echo "Celkový počet výskytov premenných bez definovaného typu vo všetkých súboroch: $total_any"
