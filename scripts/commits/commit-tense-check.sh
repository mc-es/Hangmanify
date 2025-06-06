#!/bin/bash

source "$(dirname "$0")/utils.sh"

check_env_variables
check_commit_template

if check_internet_connection; then
  npx --no-install tsx "$(dirname "$0")/commit-tense-check.ts" "$1"
  STATUS=$?

  if [ $STATUS -eq 1 ]; then
    log_error "Commit message tense error. Please refer to the guidelines in your browser."
    open_in_browser "$COMMIT_TEMPLATE_FILE"
    exit 1

  elif [ $STATUS -ne 0 ]; then
    log_error "Unknown error occurred during commit check."
    exit 1
  fi
else
  log_error "No internet connection. Cannot perform commit message tense check."
  exit 1
fi
