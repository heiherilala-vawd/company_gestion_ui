#!/bin/bash
set -e

# ───────────────────────────────────────────
# Run Cypress E2E tests with coverage
# ───────────────────────────────────────────
# Sources .env.test if present for env var overrides.
# Usage: npm run cypress:coverage
# ───────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Load test environment variables if .env.test exists
if [ -f "$PROJECT_DIR/.env.test" ]; then
  echo "Loading environment from .env.test..."
  set -a
  . "$PROJECT_DIR/.env.test"
  set +a
fi

echo "Building the app with coverage instrumentation..."
export NYC_CAFEOBJECT_COVERAGE=true
export VITE_API_URL=''
npm run build

echo "Killing any process on port 5173..."
kill $(lsof -t -i :5173) 2>/dev/null || true
sleep 1

echo "Starting static server..."
npx serve -s dist -l 5173 &
SERVER_PID=$!

echo "Waiting for server to be ready..."
npx wait-on http://localhost:5173

echo "Running Cypress tests..."
npx cypress run --config-file src/__tests__/cypress.config.ts --browser electron

echo "Generating coverage report..."
npx nyc report --reporter=text-summary --reporter=html

echo "Checking coverage thresholds..."
npx nyc check-coverage --lines 57 --functions 60 --branches 45 --statements 55

echo "Stopping static server..."
kill $SERVER_PID || true

echo "Done!"
