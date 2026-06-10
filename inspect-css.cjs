const { chromium } = require('playwright')
const BASE = 'http://localhost:5174'
const MOCK_USER = { id: 'user1_id', role: 'ADMIN', first_name: 'John', last_name: 'Doe', sex: 'M', email: 'john@test.com' }
const MOCK_COS = [
  { id: 'comp1_id', name: 'Construction BTP', company_type: 'BTP', created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-06-01T00:00:00.000Z' },
  { id: 'comp2_id', name: 'Hôtellerie Paris', company_type: 'HOTEL', created_at: '2024-02-01T00:00:00.000Z', updated_at: '2024-06-01T00:00:00.000Z' },
]
const MOCK_TEAMS = [
  { id: 'team1_id', name: 'Équipe chantier A', leader: MOCK_USER, members: [MOCK_USER], created_at: '2024-01-15T00:00:00.000Z', updated_at: '2024-06-01T00:00:00.000Z' },
  { id: 'team2_id', name: 'Équipe rénovation hôtel', leader: MOCK_USER, members: [MOCK_USER], created_at: '2024-02-10T00:00:00.000Z', updated_at: '2024-06-01T00:00:00.000Z' },
]
async function setupPage(page) {
  await page.route('**/auth/me', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(MOCK_USER) }))
  await page.route('**/auth/login', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ token: 'mock-token', user: MOCK_USER, company_id: 'comp1_id' }) }))
  await page.route('**/companies/comp1_id', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(MOCK_COS[0]) }))
  await page.route('**/companies', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(MOCK_COS) }))
  await page.route('**/teams', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(MOCK_TEAMS) }))
  await page.route('**/teams/team1_id', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(MOCK_TEAMS[0]) }))
  await page.route('**/users', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([MOCK_USER]) }))
  await page.route('**/companies/comp1_id/teams', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(MOCK_TEAMS) }))
  await page.route('**/companies/comp1_id/jobs', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }))
  await page.route('**/companies/comp1_id/users', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([MOCK_USER]) }))
}
async function run() {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] })
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await ctx.newPage()
  await setupPage(page)
  async function analyze(url, label) {
    await page.goto(BASE + url, { waitUntil: 'networkidle', timeout: 20000 }).catch(() => {})
    await page.waitForTimeout(4000)
    const result = await page.evaluate((lbl) => {
      const lines = []
      const targets = ['.RaDatagrid-root', '.RaShow-main', '.RaEdit-main', '.RaCreate-main', '.RaSimpleForm-root', '.RaTabbedForm-root', '.MuiCard-root', '.MuiPaper-root', '.RaList-main', 'table.MuiTable-root']
      lines.push(`=== ${lbl}: RA Components ===`)
      for (const sel of targets) {
        const els = document.querySelectorAll(sel)
        if (els.length === 0) { lines.push(`  ${sel}: NOT FOUND`); continue }
        const el = els[0]; const cs = getComputedStyle(el)
        lines.push(`  ${sel} (${els.length}) — borderRad:${cs.borderRadius} overflow:${cs.overflow}`)
      }
      lines.push(`\n=== Elements with overflow:hidden AND positive borderRadius ===`)
      for (const el of document.querySelectorAll('*')) {
        const cs = getComputedStyle(el)
        if ((cs.overflow === 'hidden' || cs.overflowX === 'hidden') && cs.borderRadius !== '0px') {
          const rect = el.getBoundingClientRect()
          if (rect.width > 0 && rect.height > 0 && rect.width < 2000) {
            const cls = typeof el.className === 'string' ? el.className.substring(0, 80) : ''
            lines.push(`  <${el.tagName.toLowerCase()}> ${cls}`)
            lines.push(`    borderRad:${cs.borderRadius} overflow:${cs.overflow} size:${Math.round(rect.width)}x${Math.round(rect.height)}`)
          }
        }
      }
      return lines.join('\n')
    }, label)
    console.log(result)
  }
  await analyze('/#/teams', 'TEAMS LIST')
  await analyze('/#/companies/comp1_id/show', 'COMPANY SHOW')
  await analyze('/#/companies/comp1_id', 'COMPANY EDIT')
  await analyze('/#/companies/create', 'COMPANY CREATE')
  await browser.close()
  console.log('\n=== DONE ===')
}
run().catch(err => { console.error('Error:', err); process.exit(1) })
