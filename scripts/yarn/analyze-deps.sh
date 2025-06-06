#!/bin/bash

RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[1;34m"
CYAN="\033[0;36m"
RESET="\033[0m"

PACKAGE_NAME=$1

if [ -z "$PACKAGE_NAME" ]; then
  echo "${RED}❌ Package name is missing.${RESET}"
  echo "Usage: ${YELLOW}yarn check:pkg <package-name>${RESET}"
  exit 1
fi

echo "${BLUE}🔍 Searching for '${PACKAGE_NAME}' in the dependency tree...${RESET}"
yarn list --pattern "$PACKAGE_NAME" --depth=5

echo ""
echo "${CYAN}❓ Why is '${PACKAGE_NAME}' installed? ${RESET}"

WHY_OUTPUT=$(yarn why "$PACKAGE_NAME")

if echo "$WHY_OUTPUT" | grep -q 'specified in "dependencies"'; then
  echo "${GREEN}✔ This package is directly specified in dependencies.${RESET}"
elif echo "$WHY_OUTPUT" | grep -q 'specified in "devDependencies"'; then
  echo "${GREEN}✔ This package is directly specified in devDependencies.${RESET}"
elif echo "$WHY_OUTPUT" | grep -q 'depends on it'; then
  echo "${YELLOW}⚠ This package is indirectly required by another dependency.${RESET}"
else
  echo "${RED}❌ Could not determine the source of the package.${RESET}"
fi

echo ""
echo "${BLUE}📦 Detailed disk usage for hoisted versions only:${RESET}"

echo "$WHY_OUTPUT" | awk -v YELLOW="$YELLOW" -v RESET="$RESET" -v CYAN="$CYAN" -v BLUE="$BLUE" '
  BEGIN { RS="=> "; FS="\n" }
  NR > 1 {
    print "\n" CYAN "→ " $1 RESET
    has_disk_info = 0
    for (i = 2; i <= NF; i++) {
      if ($i ~ /Disk size|Number of shared dependencies/) {
        gsub("info ", "", $i)

        if ($i ~ /Disk size without dependencies/)
          print "  " $i " (size of the package alone)"
        else if ($i ~ /Disk size with unique dependencies/)
          print "  " $i " (package + its unique dependencies)"
        else if ($i ~ /Disk size with transitive dependencies/)
          print "  " $i " (package + all transitive dependencies)"
        else if ($i ~ /Number of shared dependencies/)
          print "  " $i " (dependencies shared with other packages)"
        else
          print "  " $i

        has_disk_info = 1
      }
    }
    if (has_disk_info == 0) {
      print "  " YELLOW "⚠ Skipping non-hoisted version (no disk usage info available)." RESET
    }
  }
'

echo ""
echo "${CYAN}🌐 NPM page:${RESET} https://www.npmjs.com/package/$PACKAGE_NAME"

# echo ""
# echo "${CYAN}📄 Full 'yarn why' output:${RESET}"
# echo "$WHY_OUTPUT"
