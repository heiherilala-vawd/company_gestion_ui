# ───────────────────────────────────────────
# Multi-stage Dockerfile for E2E tests
# ───────────────────────────────────────────
# Stages:
#   build          - Build app with coverage instrumentation
#   server         - Serve built app via nginx
#   cypress-runner - Run Cypress tests with coverage
# ───────────────────────────────────────────

# ============================================
# Stage 1: Build
# ============================================
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NYC_CAFEOBJECT_COVERAGE=true
ENV VITE_API_URL=''
RUN npm run build

# ============================================
# Stage 2: Server (nginx)
# ============================================
FROM nginx:alpine AS server
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173

# ============================================
# Stage 3: Cypress runner
# ============================================
FROM cypress/base:20.18.0 AS cypress-runner
WORKDIR /app

# Install project dependencies (includes Cypress)
COPY package*.json ./
RUN npm ci

# Copy source, tests, and config
COPY . .

# Reuse the build from stage 1 (for coverage instrumentation)
COPY --from=build /app/dist ./dist

# These can be overridden via docker-compose environment
ENV CYPRESS_BASE_URL=http://app:5173
ENV CYPRESS_VIDEO=false
ENV NYC_CAFEOBJECT_COVERAGE=true
ENV VITE_API_URL=''

# Default command: run tests, generate coverage report, check thresholds
CMD npx cypress run --config-file src/__tests__/cypress.config.ts --browser electron \
    && npx nyc report --reporter=text-summary --reporter=html \
    && npx nyc check-coverage --lines 57 --functions 60 --branches 45 --statements 55
