#!/bin/bash

COMMIT_TEMPLATE_FILE="$(dirname "$0")/commit-message-template.html"
FILE_URL="file://$COMMIT_TEMPLATE_FILE"

check_commit_template() {
  if [ -f "$COMMIT_TEMPLATE_FILE" ]; then
    log_info "You can view the commit message template here: $FILE_URL"
  else
    log_error "Commit template file not found at $COMMIT_TEMPLATE_FILE."
    exit 1
  fi
}

check_internet_connection() {
  if curl -s --head http://www.google.com/ | grep "200 OK" > /dev/null; then
    return 0
  else
    return 1
  fi
}

open_in_browser() {
  local file="$1"
  if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$file" >/dev/null 2>&1
  elif command -v open >/dev/null 2>&1; then
    open "$file"
  elif command -v start >/dev/null 2>&1; then
    start "" "$file"
  else
    log_error "No suitable command to open the file in the browser found."
    exit 1
  fi
}

check_env_variables() {
  if [ ! -f ".env" ]; then
    log_error ".env file not found."
    open_in_browser "$FILE_URL"
    exit 1
  fi

  if ! grep -q "^GOOGLE_GENERATIVE_AI_API_KEY=" .env; then
    log_error "GOOGLE_GENERATIVE_AI_API_KEY is missing in .env"
    open_in_browser "$FILE_URL"
    exit 1
  fi

  KEY_VALUE=$(grep "^GOOGLE_GENERATIVE_AI_API_KEY=" .env | cut -d '=' -f2- | sed 's/^[ \t]*//;s/[ \t]*$//')
  if [ -z "$KEY_VALUE" ] || echo "$KEY_VALUE" | grep -q "^#"; then
    log_error "GOOGLE_GENERATIVE_AI_API_KEY is empty or commented out in .env"
    open_in_browser "$FILE_URL"
    exit 1
  fi
}

log_error() {
  echo -e "\033[1;37;41m ❌ $1 \033[0m"
}

log_info() {
  echo -e "\033[1;30;46m ℹ️  $1 \033[0m"
}

log_success() {
  echo -e "\033[1;30;42m ✅ $1 \033[0m"
}
