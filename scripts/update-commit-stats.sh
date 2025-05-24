README=".husky/README.md"
TEMP_OUTPUT=".husky/.readme-without-stats.tmp"
TEMP_STATS=".husky/.commit-raw.tmp"
TEMP_CHART=".husky/.commit-chart.tmp"

# 1. Get commit types from the last 7 days
git log --since="7 days ago" --pretty=format:'%s' \
  | grep -o '^[a-z]\+' \
  | sort | uniq -c | sort -nr > "$TEMP_STATS"

# 2. Determine the highest commit count for scaling the bar chart
MAX_COUNT=$(awk '{print $1}' "$TEMP_STATS" | sort -nr | head -n1)
MAX_BAR=20

# 3. Generate ASCII bar chart
> "$TEMP_CHART"
while read -r count type; do
  bar_length=$(( count * MAX_BAR / MAX_COUNT ))
  bar=$(printf '█%.0s' $(seq 1 $bar_length))
  printf "%-8s %-20s %2s\n" "$type" "$bar" "$count" >> "$TEMP_CHART"
done < "$TEMP_STATS"

# 4. Remove existing stats section from README (if any)
awk '
  BEGIN { skip=0 }
  /^## 📊 Weekly Commit Type Stats/ { skip=1; next }
  skip == 1 && /^## / { skip=0 }
  skip == 0 { print }
' "$README" > "$TEMP_OUTPUT"

# 5. Build the new stats section with bar chart
STATS_SECTION=$(cat <<EOF
## 📊 Weekly Commit Type Stats
\`\`\`
$(cat "$TEMP_CHART")
\`\`\`

---
EOF
)

# 6. Insert the new stats section before the "## 📘 Resources" heading
awk -v stats="$STATS_SECTION" '
  /^## 📘 Resources/ {
    print stats
    print ""
  }
  { print }
' "$TEMP_OUTPUT" > "$README"

# 7. Clean up temporary files
rm "$TEMP_OUTPUT" "$TEMP_STATS" "$TEMP_CHART"
