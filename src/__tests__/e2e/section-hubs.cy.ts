import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Section Hub Pages → Activity Forms', () => {
  beforeEach(() => {
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  function clickHubButton(desc: string) {
    cy.get('[data-testid="section-hub"]').contains(desc).click({ force: true })
  }

  function navigateViaBottomNav(label: string) {
    cy.contains('[class*="MuiBottomNavigationAction"]', label).click({ force: true })
    cy.wait(1000)
  }

  // ==================== StockPage ====================

  function testStockPurchaseMaterialRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('Stock')
    cy.get('[data-testid="section-hub"]')
      .contains('Actions Stock', { timeout: 10000 })
      .should('be.visible')
    clickHubButton('Acheter du matériau')
    cy.url({ timeout: 15000 }).should('include', '/purchases_material_activity')
    cy.contains("Nouvelle Opération d'Achat Matériau", { timeout: 10000 }).should('exist')
  }

  function testStockMaterialConsumptionRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('Stock')
    cy.get('[data-testid="section-hub"]')
      .contains('Actions Stock', { timeout: 10000 })
      .should('be.visible')
    clickHubButton('Consommer un matériau')
    cy.url({ timeout: 15000 }).should('include', '/material_consumption_activity')
    cy.contains('Consommer des matériaux', { timeout: 10000 }).should('be.visible')
  }

  function testStockMaterialReturnRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('Stock')
    cy.get('[data-testid="section-hub"]')
      .contains('Actions Stock', { timeout: 10000 })
      .should('be.visible')
    clickHubButton('Retourner les restes')
    cy.url({ timeout: 15000 }).should('include', '/material_return_activity')
    cy.contains('Retour de matériaux', { timeout: 10000 }).should('be.visible')
    cy.get('[data-testid="submit-return"]', { timeout: 10000 }).should('be.visible')
    cy.contains('Cement', { timeout: 10000 }).should('be.visible')
    cy.contains('50', { timeout: 10000 }).should('be.visible')
  }

  function testStockTravelMaterialRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('Stock')
    cy.get('[data-testid="section-hub"]')
      .contains('Actions Stock', { timeout: 10000 })
      .should('be.visible')
    clickHubButton('Déplacer des matériaux')
    cy.url({ timeout: 15000 }).should('include', '/travel_material_activity')
    cy.contains('Déplacer des matériaux', { timeout: 10000 }).should('be.visible')
  }

  // ==================== EquipmentPage ====================

  function testEquipmentPurchaseRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('Équipement')
    cy.get('[data-testid="section-hub"]')
      .contains('Actions Équipement', { timeout: 10000 })
      .should('be.visible')
    clickHubButton('Acheter un équipement')
    cy.url({ timeout: 15000 }).should('include', '/purchases_equipment_activity')
    cy.contains("Nouvelle Opération d'Achat Équipement", { timeout: 10000 }).should('exist')
  }

  function testEquipmentUsageRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('Équipement')
    cy.get('[data-testid="section-hub"]')
      .contains('Actions Équipement', { timeout: 10000 })
      .should('be.visible')
    clickHubButton('Utiliser un équipement')
    cy.url({ timeout: 15000 }).should('include', '/equipment_usage_activity')
    cy.contains('Utiliser un équipement', { timeout: 10000 }).should('be.visible')
  }

  function testEquipmentReturnRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('Équipement')
    cy.get('[data-testid="section-hub"]')
      .contains('Actions Équipement', { timeout: 10000 })
      .should('be.visible')
    clickHubButton('Retourner un équipement')
    cy.url({ timeout: 15000 }).should('include', '/equipment_return_activity')
    cy.contains("Retour d'équipement", { timeout: 10000 }).should('be.visible')
  }

  function testEquipmentDeplacementRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('Équipement')
    cy.get('[data-testid="section-hub"]')
      .contains('Actions Équipement', { timeout: 10000 })
      .should('be.visible')
    clickHubButton('Déplacer des équipements')
    cy.url({ timeout: 15000 }).should('include', '/travel_equipment_activity')
    cy.contains('Déplacer des équipements', { timeout: 10000 }).should('be.visible')
  }

  function testEquipmentMaintenanceRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('Équipement')
    cy.get('[data-testid="section-hub"]')
      .contains('Actions Équipement', { timeout: 10000 })
      .should('be.visible')
    clickHubButton('Faire une maintenance')
    cy.url({ timeout: 15000 }).should('include', '/maintenance_activity')
    cy.contains('Faire une maintenance', { timeout: 10000 }).should('be.visible')
  }

  function testEquipmentScheduledMaintenanceRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('Équipement')
    cy.get('[data-testid="section-hub"]')
      .contains('Actions Équipement', { timeout: 10000 })
      .should('be.visible')
    clickHubButton('Planifier maintenance')
    cy.url({ timeout: 15000 }).should('include', '/scheduled_maintenance_activity')
    cy.contains('Planifier une maintenance', { timeout: 10000 }).should('be.visible')
  }

  // ==================== RHPage ====================

  function testRHTacheRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('RH')
    cy.get('[data-testid="section-hub"]')
      .contains('Actions RH', { timeout: 10000 })
      .should('be.visible')
    clickHubButton('Assigner tâche')
    cy.url({ timeout: 15000 }).should('include', '/tasks/create')
    cy.get('[data-testid="input-title"]', { timeout: 10000 }).should('exist')
  }

  function testRHPaiementRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('RH')
    cy.get('[data-testid="section-hub"]')
      .contains('Actions RH', { timeout: 10000 })
      .should('be.visible')
    clickHubButton('Payer employé')
    cy.url({ timeout: 15000 }).should('include', '/employee_payment_activity')
    cy.get('[data-testid="input-is_for_team"]', { timeout: 10000 }).should('exist')
  }

  function testRHTeamRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('RH')
    cy.get('[data-testid="section-hub"]')
      .contains('Actions RH', { timeout: 10000 })
      .should('be.visible')
    clickHubButton('Créer équipe')
    cy.url({ timeout: 15000 }).should('include', '/team_activity')
    cy.contains('Nouvelle Équipe', { timeout: 10000 }).should('exist')
  }

  function testRHTravailRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('RH')
    cy.get('[data-testid="section-hub"]')
      .contains('Actions RH', { timeout: 10000 })
      .should('be.visible')
    clickHubButton('Assigner travail')
    cy.url({ timeout: 15000 }).should('include', '/job_assignment_activity')
    cy.contains('Assigner', { timeout: 10000 }).should('be.visible')
  }

  function testRHDeplacementRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('RH')
    cy.get('[data-testid="section-hub"]')
      .contains('Actions RH', { timeout: 10000 })
      .should('be.visible')
    clickHubButton('Transport personnel')
    cy.url({ timeout: 15000 }).should('include', '/travel_people_activity')
    cy.contains('Déplacement personnel', { timeout: 10000 }).should('be.visible')
  }

  // ==================== MonetaryPage ====================

  function testMonetaryDepenseRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('Base de déplacement')
    cy.get('[data-testid="section-hub"]')
      .contains('Activité', { timeout: 10000 })
      .should('be.visible')
    clickHubButton('Nouvelle dépense')
    cy.url({ timeout: 15000 }).should('include', '/expenses_activity')
    cy.get('[data-testid="input-bank_name"]', { timeout: 10000 }).should('exist')
  }

  function testMonetaryRevenuRedirect(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateViaBottomNav('Base de déplacement')
    cy.get('[data-testid="section-hub"]')
      .contains('Activité', { timeout: 10000 })
      .should('be.visible')
    clickHubButton("Entrée d'argent")
    cy.url({ timeout: 15000 }).should('include', '/incomes_activity')
    cy.get('[data-testid="input-source_organization"]', { timeout: 10000 }).should('exist')
  }

  // ==================== Tests ====================

  it('StockPage: Acheter du matériau redirects to purchase material form (desktop)', () =>
    testStockPurchaseMaterialRedirect(true))
  it('StockPage: Acheter du matériau redirects to purchase material form (mobile)', () =>
    testStockPurchaseMaterialRedirect(false))

  it('StockPage: Consommer un matériau redirects to consumption form (desktop)', () =>
    testStockMaterialConsumptionRedirect(true))
  it('StockPage: Consommer un matériau redirects to consumption form (mobile)', () =>
    testStockMaterialConsumptionRedirect(false))

  it('StockPage: Retourner les restes redirects to material return form (desktop)', () =>
    testStockMaterialReturnRedirect(true))
  it('StockPage: Retourner les restes redirects to material return form (mobile)', () =>
    testStockMaterialReturnRedirect(false))

  it('StockPage: Déplacer des matériaux redirects to travel material form (desktop)', () =>
    testStockTravelMaterialRedirect(true))
  it('StockPage: Déplacer des matériaux redirects to travel material form (mobile)', () =>
    testStockTravelMaterialRedirect(false))

  it('EquipmentPage: Acheter un équipement redirects (desktop)', () =>
    testEquipmentPurchaseRedirect(true))
  it('EquipmentPage: Acheter un équipement redirects (mobile)', () =>
    testEquipmentPurchaseRedirect(false))

  it('EquipmentPage: Utiliser un équipement redirects (desktop)', () =>
    testEquipmentUsageRedirect(true))
  it('EquipmentPage: Utiliser un équipement redirects (mobile)', () =>
    testEquipmentUsageRedirect(false))

  it('EquipmentPage: Retourner un équipement redirects (desktop)', () =>
    testEquipmentReturnRedirect(true))
  it('EquipmentPage: Retourner un équipement redirects (mobile)', () =>
    testEquipmentReturnRedirect(false))

  it('EquipmentPage: Déplacer des équipements redirects (desktop)', () =>
    testEquipmentDeplacementRedirect(true))
  it('EquipmentPage: Déplacer des équipements redirects (mobile)', () =>
    testEquipmentDeplacementRedirect(false))

  it('EquipmentPage: Faire une maintenance redirects (desktop)', () =>
    testEquipmentMaintenanceRedirect(true))
  it('EquipmentPage: Faire une maintenance redirects (mobile)', () =>
    testEquipmentMaintenanceRedirect(false))

  it('EquipmentPage: Planifier maintenance redirects (desktop)', () =>
    testEquipmentScheduledMaintenanceRedirect(true))
  it('EquipmentPage: Planifier maintenance redirects (mobile)', () =>
    testEquipmentScheduledMaintenanceRedirect(false))

  it('RHPage: Tâche button redirects to task create (desktop)', () => testRHTacheRedirect(true))
  it('RHPage: Tâche button redirects to task create (mobile)', () => testRHTacheRedirect(false))

  it('RHPage: Paiement button redirects to expenses activity (desktop)', () =>
    testRHPaiementRedirect(true))
  it('RHPage: Paiement button redirects to expenses activity (mobile)', () =>
    testRHPaiementRedirect(false))

  it('RHPage: Équipe button redirects to team activity form (desktop)', () =>
    testRHTeamRedirect(true))
  it('RHPage: Équipe button redirects to team activity form (mobile)', () =>
    testRHTeamRedirect(false))

  it('RHPage: Travail button redirects to job assignment form (desktop)', () =>
    testRHTravailRedirect(true))
  it('RHPage: Travail button redirects to job assignment form (mobile)', () =>
    testRHTravailRedirect(false))

  it('RHPage: Déplacement button redirects to travel people form (desktop)', () =>
    testRHDeplacementRedirect(true))
  it('RHPage: Déplacement button redirects to travel people form (mobile)', () =>
    testRHDeplacementRedirect(false))

  it('MonetaryPage: Dépense button redirects to expenses activity (desktop)', () =>
    testMonetaryDepenseRedirect(true))
  it('MonetaryPage: Dépense button redirects to expenses activity (mobile)', () =>
    testMonetaryDepenseRedirect(false))

  it('MonetaryPage: Revenu button redirects to incomes activity (desktop)', () =>
    testMonetaryRevenuRedirect(true))
  it('MonetaryPage: Revenu button redirects to incomes activity (mobile)', () =>
    testMonetaryRevenuRedirect(false))
})
