#!/bin/bash
set -e

echo "Building the app with coverage instrumentation..."
export NYC_CAFEOBJECT_COVERAGE=true
export VITE_API_URL=''
npm run build

echo "Starting static server..."
serve -s dist -l 5173 &
SERVER_PID=$!

echo "Waiting for server to be ready..."
npx wait-on http://localhost:5173

echo "Running Cypress tests..."
npx cypress run --config-file src/__tests__/cypress.config.ts

echo "Generating coverage report..."
npx nyc report --reporter=text-summary --reporter=html

echo "Checking coverage threshold (60%)..."
npx nyc check-coverage --lines 60 --functions 60 --branches 60 --statements 60

echo "Stopping static server..."
kill $SERVER_PID || true

echo "Done!"
