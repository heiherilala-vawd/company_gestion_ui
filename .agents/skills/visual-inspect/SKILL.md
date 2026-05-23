---
name: visual-inspect
description: >
  Visually inspect UI changes by launching a headless browser (Playwright) against
  the built app, intercepting API calls with mock responses, and capturing screenshots
  at desktop and mobile viewports. Use this ONLY when the user explicitly asks you to
  verify your CSS/Style implementation changes. Never use it proactively. Essential
  for debugging border-radius, layout, spacing, and responsive issues that cannot be
  detected by static analysis or type-checking alone.
---

# Visual Inspection with Playwright

## When to use

Use this skill **only when the user explicitly asks** you to verify your implementation
visually (phrases like "verify", "check the UI", "see what it looks like", "visually
inspect", "capture screenshot", "regarde ce que ça donne"). Do NOT use it proactively.

## Prerequisites

### 1. Playwright

Check if Playwright is installed:

```bash
# Is it in node_modules?
node -e "require('playwright')" 2>/dev/null && echo "OK" || echo "NOT INSTALLED"

# Is it available globally via npx?
npx playwright --version 2>/dev/null || echo "NOT AVAILABLE"
```

If not installed:

```bash
npm install -D playwright
```

Then install the Chromium browser engine:

```bash
npx playwright install chromium
```

> Chromium headless shell (~113 MB) is sufficient — no GUI needed.

### 2. Dev server or static build

Two options, from fastest to most reliable:

| Method | Command | Best for |
|--------|---------|----------|
| **Build + Serve** | `npm run build && npx serve dist -p 5176 -s` | Final verification, ensures production-like output |
| **Dev server** | `npm run dev` | Quick iteration during development |

**Recommendation:** Use Build + Serve for accuracy. The dev server's HMR can mask
build-level issues. The built app uses the exact same bundled code that will go to
production.

If using dev server, find the actual port (may differ from 5173):

```bash
grep -o "http://localhost:[0-9]*" /tmp/vite-dev.log | head -1
```

## Workflow

### Step 1: Write the inspection script

Create a script at `<project-root>/inspect.cjs` (CommonJS so it requires no ESM config):

```javascript
const { chromium } = require('playwright')

const BASE = 'http://localhost:5176'  // update port if needed

// Mock data — adapt to your app's data model
const MOCK_USER = {
  id: 1,
  email: 'test@test.com',
  username: 'test',
  firstname: 'Test',
  lastname: 'User',
  role: { id: 1, name: 'admin', permissions: ['*'] },
  companies: [{ id: 1, name: 'Test Company' }],
}

async function run() {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] })

  // --- DESKTOP viewport ---
  const desktopCtx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const desktop = await desktopCtx.newPage()

  // Intercept all API calls and return mocks
  await desktop.route('**/auth/me', route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(MOCK_USER) })
  )
  await desktop.route('**/auth/login', route =>
    route.fulfill({ status: 200, contentType: 'application/json',
      body: JSON.stringify({ token: 'mock-token', user: MOCK_USER }) })
  )
  await desktop.route(/\/(users|companies|jobs|expenses|incomes|purchases|materials|equipment|warehouses)/, route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
  )

  await desktop.goto(BASE + '/#/', { waitUntil: 'networkidle', timeout: 20000 }).catch(() => {})
  await desktop.waitForTimeout(3000)  // wait for React to hydrate and render
  await desktop.screenshot({ path: '/tmp/inspect-desktop.png', fullPage: true })
  console.log('Desktop screenshot: /tmp/inspect-desktop.png')

  // --- MOBILE viewport ---
  const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 667 } })
  const mobile = await mobileCtx.newPage()
  // Re-apply same route interception for the mobile page
  await mobile.route('**/auth/me', route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(MOCK_USER) })
  )
  await mobile.route('**/auth/login', route =>
    route.fulfill({ status: 200, contentType: 'application/json',
      body: JSON.stringify({ token: 'mock-token', user: MOCK_USER }) })
  )
  await mobile.route(/\/(users|companies|jobs|expenses|incomes|purchases|materials|equipment|warehouses)/, route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
  )

  await mobile.goto(BASE + '/#/', { waitUntil: 'networkidle', timeout: 20000 }).catch(() => {})
  await mobile.waitForTimeout(3000)
  await mobile.screenshot({ path: '/tmp/inspect-mobile.png', fullPage: true })
  console.log('Mobile screenshot: /tmp/inspect-mobile.png')

  // --- CSS ANALYSIS (optional) ---
  // Use any page to inspect computed styles
  const brSummary = await desktop.evaluate(() => {
    const all = document.querySelectorAll('*')
    const map = {}
    for (const el of all) {
      const cs = getComputedStyle(el)
      const br = cs.borderRadius
      if (br && br !== '0px') {
        const key = br
        if (!map[key]) map[key] = { br: key, count: 0, examples: [] }
        map[key].count++
        if (map[key].examples.length < 3) {
          const rect = el.getBoundingClientRect()
          map[key].examples.push({
            tag: el.tagName,
            cls: el.className.substring(0, 100),
            size: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
          })
        }
      }
    }
    return Object.values(map).sort((a, b) => b.count - a.count)
  })
  console.log('\nBorder-radius summary:')
  for (const r of brSummary) {
    console.log(`  ${r.br}: ${r.count}x`)
    for (const ex of r.examples) console.log(`    <${ex.tag} ${ex.size}> ${ex.cls}`)
  }

  await browser.close()
}

run().catch(err => { console.error('Error:', err); process.exit(1) })
```

### Step 2: Adapt mocks to the page under test

The mock data above is minimal. For pages that load specific resources, you may
need richer mock data. Examples:

```javascript
// For a List page that shows companies:
await page.route('**/companies', route =>
  route.fulfill({ status: 200, contentType: 'application/json',
    body: JSON.stringify([{ id: 1, name: 'Acme Corp', siret: '123456789', is_active: true }])
  })
)

// For a Create page with a form that needs references:
await page.route('**/jobs', route =>
  route.fulfill({ status: 200, contentType: 'application/json',
    body: JSON.stringify([{ id: 1, name: 'Job A', company_id: 1 }, { id: 2, name: 'Job B', company_id: 1 }])
  })
)
```

### Step 3: Run the script

```bash
node inspect.cjs
```

Output:
- `/tmp/inspect-desktop.png` — 1280×900 viewport
- `/tmp/inspect-mobile.png` — 375×667 viewport
- Console log with border-radius analysis

### Step 4: Show results to the user

Use the `read` tool with the screenshot paths to display them. The tool renders
image files. Present both desktop and mobile views side by side for comparison.

### Step 5: Cleanup

```bash
rm -f inspect.cjs    # remove the temp script
kill $(lsof -ti:5176) 2>/dev/null   # kill the server
```

## Troubleshooting

### Playwright errors

| Error | Fix |
|-------|-----|
| `Cannot find module 'playwright'` | Run `npm install -D playwright` from project root |
| `Browser not found` | Run `npx playwright install chromium` |
| `Target closed` / `detached` | The page timed out. Increase `waitForTimeout` or check if the dev server is running |

### Page not rendering

- The app may be stuck at login if `/auth/me` returns a 404 instead of the mock
  — check that route interception is catching the right URL pattern
- The app may show a blank white screen if a JS error occurs on render
  — listen to `page.on('pageerror')` to catch it:
  ```javascript
  page.on('pageerror', err => console.error('Page error:', err.message))
  ```

### CSS analysis shows wrong values

The built app may differ from the dev server. Always use `npm run build` before
screenshotting for final verification. MUI's `styleOverrides` use CSS-in-JS and
numeric borderRadius values can be transformed by `theme.shape.borderRadius`:

```javascript
// PROBLEM: numeric value gets multiplied by theme.shape.borderRadius
borderRadius: 16   // might produce 192px if shape.borderRadius = 12

// FIX: use pixel strings or set shape.borderRadius = 0 in theme
borderRadius: '16px'
// OR in theme.ts:
shape: { borderRadius: 0 }
```

## Responsive testing

| Device | Viewport | File |
|--------|----------|------|
| Desktop HD | 1280×900 | `/tmp/inspect-desktop.png` |
| Mobile (iPhone SE) | 375×667 | `/tmp/inspect-mobile.png` |
| Tablet (optional) | 768×1024 | Add a third context |

Add a tablet viewport if you need to verify tablet breakpoints:

```javascript
const tabletCtx = await browser.newContext({ viewport: { width: 768, height: 1024 } })
```
