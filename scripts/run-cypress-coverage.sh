#!/bin/bash
set -e

# ───────────────────────────────────────────
# Run Cypress E2E tests with coverage
# ───────────────────────────────────────────
# Sources .env.test if present for env var overrides.
# Uses a dedicated port (default 5174) to never conflict with dev.
# Usage: npm run cypress:coverage
# ───────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Default test port (dedicated — never conflicts with dev on 5173)
TEST_APP_PORT=${TEST_APP_PORT:-5174}

# Load test environment variables if .env.test exists
if [ -f "$PROJECT_DIR/.env.test" ]; then
  echo "Loading environment from .env.test..."
  set -a
  . "$PROJECT_DIR/.env.test"
  set +a
  # Re-apply in case .env.test overrode it
  TEST_APP_PORT=${TEST_APP_PORT:-5174}
fi

echo "Building the app with coverage instrumentation..."
export NYC_CAFEOBJECT_COVERAGE=true
export VITE_API_URL=''
npm run build

echo "Starting static server on port $TEST_APP_PORT..."
npx serve -s dist -l "$TEST_APP_PORT" &
SERVER_PID=$!

echo "Waiting for server to be ready..."
npx wait-on "http://localhost:$TEST_APP_PORT"

export CYPRESS_BASE_URL="http://localhost:$TEST_APP_PORT"

echo "Running Cypress tests against http://localhost:$TEST_APP_PORT ..."
npx cypress run --config-file src/__tests__/cypress.config.ts --browser electron

echo "Generating coverage report..."
npx nyc report --reporter=text-summary --reporter=html

echo "Checking coverage thresholds..."
npx nyc check-coverage --lines 57 --functions 60 --branches 45 --statements 55

echo "Stopping static server..."
kill $SERVER_PID || true

echo "Done!"
