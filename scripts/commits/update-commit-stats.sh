#!/bin/bash

README=".husky/README.md"
TEMP_OUTPUT=".husky/.readme-without-stats.tmp"
TEMP_STATS=".husky/.commit-raw.tmp"
TEMP_CHART=".husky/.commit-chart.tmp"

# 1. Get commit types from the full history
git log --pretty=format:'%s' \
  | grep -o '^[a-z]\+' \
  | sort | uniq -c | sort -nr > "$TEMP_STATS"

# 2. Calculate total number of commits
TOTAL=$(awk '{sum += $1} END {print sum}' "$TEMP_STATS")

# 3. Generate lines and track cumulative percentage
> "$TEMP_CHART"
sum_percent=0
declare -a lines

while read -r count type; do
  percent=$(awk -v c="$count" -v t="$TOTAL" 'BEGIN { printf "%.0f", (c * 100 / t) }')
  sum_percent=$((sum_percent + percent))
  plural="s"
  [ "$count" -eq 1 ] && plural=""
  lines+=("$(printf "%-8s : %2d commit%s (%d%%)" "$type" "$count" "$plural" "$percent")")
done < "$TEMP_STATS"

# 4. Adjust the top line if percentage sum is not 100
if [ "$sum_percent" -ne 100 ] && [ "${#lines[@]}" -gt 0 ]; then
  diff=$((100 - sum_percent))
  original="${lines[0]}"
  # Extract current percent value from e.g., "(39%)"
  percent_val=$(echo "$original" | grep -o '([0-9]\+%)' | grep -o '[0-9]\+')
  new_percent=$((percent_val + diff))
  # Replace (XX%) with (YY%)
  lines[0]=$(echo "$original" | sed -E "s/\([0-9]+%\)/(${new_percent}%)/")
fi

# 5. Write lines to chart
printf "%s\n" "${lines[@]}" > "$TEMP_CHART"

# 6. Remove old stats section from README
awk '
  BEGIN { skip=0 }
  /^## 📊 Weekly Commit Type Stats/ { skip=1; next }
  skip == 1 && /^## / { skip=0 }
  skip == 0 { print }
' "$README" > "$TEMP_OUTPUT"

# 7. Build the new stats section
STATS_SECTION=$(cat <<EOF
## 📊 Weekly Commit Type Stats
\`\`\`
$(cat "$TEMP_CHART")
\`\`\`

---
EOF
)

# 8. Insert the new stats section before "## 📘 Resources"
awk -v stats="$STATS_SECTION" '
  /^## 📘 Resources/ {
    print stats
    print ""
  }
  { print }
' "$TEMP_OUTPUT" > "$README"

# 9. Clean up
rm "$TEMP_OUTPUT" "$TEMP_STATS" "$TEMP_CHART"
