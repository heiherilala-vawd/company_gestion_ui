import { mockSuccessResponse } from '../mocks/responses/auth-api'
import { createOrUpdateBankFees } from '../mocks/responses/bank-fees-api'
import { createOrUpdateEmployeePayments } from '../mocks/responses/employee-payments-api'
import { createOrUpdateOtherExpenses } from '../mocks/responses/other-expenses-api'
import { createOrUpdateIncomes } from '../mocks/responses/incomes-api'
import { createOrUpdateLoans } from '../mocks/responses/loans-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectEmployee,
  selectEnumType,
  selectIncomeType,
  selectMaterial,
} from '../support/utils.ts'
import { materialWarehouse1Mock } from '../mocks/responses/material-warehouse-api'
import { warehouse1Mock } from '../mocks/responses/warehouses-api'
import { material1Mock } from '../mocks/responses/materials-api'

describe('E2E: Activity Pages', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
    cy.wait(500)
  })

  function goHome() {
    cy.visit('/')
    cy.url({ timeout: 10000 }).should('not.include', '/login')
    cy.wait(500)
  }

  function clickHomeButton(label: string) {
    cy.get('button').contains(label).scrollIntoView()
    cy.get('button').contains(label).click({ force: true })
  }

  // ==================== EMPLOYER PAYMENT ACTIVITY ====================

  function testEmployerPaymentActivity(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    clickHomeButton('Valider paiement / Retourner emprunt')
    cy.url({ timeout: 15000 }).should('include', '/employer_payments_activity')
    cy.wait(500)

    cy.contains('Valider paiement').should('be.visible')
    cy.contains('Client Corp').should('be.visible')

    cy.contains('Retourner emprunt').scrollIntoView().click({ force: true })
    cy.wait(300)
    cy.contains('Emprunts en défaut').should('be.visible')
    cy.contains('Emprunts actifs').should('be.visible')
    cy.contains('Banque Populaire').should('be.visible')
  }

  // ==================== TRAVEL MATERIAL ACTIVITY ====================

  function testTravelMaterialActivity(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    clickHomeButton('Valider Réception')
    cy.url({ timeout: 15000 }).should('include', '/travel_materials_activity')
    cy.wait(500)

    cy.contains('Lieu de réception').should('be.visible')
    cy.contains(materialWarehouse1Mock.material?.name).should('be.visible')

    cy.contains('Équipement').scrollIntoView().click({ force: true })
  }

  // ==================== EXPENSES ACTIVITY ====================

  function testExpensesActivity(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    clickHomeButton('Dépenses')
    cy.url({ timeout: 15000 }).should('include', '/expenses_activity')

    cy.get('[data-testid="input-bank_name"] input').clear().type('BNP Paribas Test')
    cy.get('[data-testid="input-description"] textarea:visible').clear().type('Test bank fee')
    cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
      .clear()
      .type('5000')
    cy.intercept('PUT', '**/bank_fees', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateBankFees(req.body)))
    }).as('createBankFee')
    cy.get('button[type="submit"]').scrollIntoView().click({ force: true })
    cy.wait('@createBankFee', { timeout: 10000 })

    goHome()
    clickHomeButton('Dépenses')
    cy.url({ timeout: 15000 }).should('include', '/expenses_activity')
    cy.wait(300)

    cy.contains('Paiement salarié').scrollIntoView().click({ force: true })
    cy.wait(300)
    selectEmployee()
    cy.get('[data-testid="input-payment_description"] textarea:visible').clear().type('Test salary')
    selectEnumType('input-payment_type', 'Mensuel')
    cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
      .clear()
      .type('3000')
    cy.intercept('PUT', '**/employee_payments', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateEmployeePayments(req.body)))
    }).as('createEmployeePayment')
    cy.get('button[type="submit"]').scrollIntoView().click({ force: true })
    cy.wait('@createEmployeePayment', { timeout: 10000 })

    goHome()
    clickHomeButton('Dépenses')
    cy.url({ timeout: 15000 }).should('include', '/expenses_activity')
    cy.wait(300)

    cy.contains('Autre dépense').scrollIntoView().click({ force: true })
    cy.wait(300)
    cy.get('[data-testid="input-description"] textarea:visible').clear().type('Test other expense')
    cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
      .clear()
      .type('2000')
    cy.intercept('PUT', '**/other_expenses', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateOtherExpenses(req.body)))
    }).as('createOtherExpense')
    cy.get('button[type="submit"]').scrollIntoView().click({ force: true })
    cy.wait('@createOtherExpense', { timeout: 10000 })
  }

  // ==================== INCOMES ACTIVITY ====================

  function testIncomesActivity(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    clickHomeButton('Revenus / Emprunts')
    cy.url({ timeout: 15000 }).should('include', '/incomes_activity')

    selectIncomeType('income_type_id')
    cy.get('[data-testid="input-source_organization"] input').clear().type('Test Client')
    cy.get('[data-testid="input-invoice_reference"] input').clear().type('INV-TEST-001')
    cy.get('[data-testid="input-amount"] input').clear().type('15000')
    cy.get('[data-testid="input-description"] textarea:visible').clear().type('Test income')
    cy.intercept('PUT', '**/incomes', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateIncomes(req.body)))
    }).as('createIncome')
    cy.get('button[type="submit"]').scrollIntoView().click({ force: true })
    cy.wait('@createIncome', { timeout: 10000 })

    goHome()
    clickHomeButton('Revenus / Emprunts')
    cy.url({ timeout: 15000 }).should('include', '/incomes_activity')
    cy.wait(300)

    cy.contains('Emprunts').scrollIntoView().click({ force: true })
    cy.wait(300)
    cy.get('[data-testid="input-lender"] input').clear().type('Test Bank')
    cy.get('[data-testid="input-amount"] input').clear().type('50000')
    cy.get('[data-testid="input-interest_rate"] input').clear().type('1200')
    cy.get('[data-testid="input-description"] textarea:visible').clear().type('Test loan')
    cy.intercept('PUT', '**/loans', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateLoans(req.body)))
    }).as('createLoan')
    cy.get('button[type="submit"]').scrollIntoView().click({ force: true })
    cy.wait('@createLoan', { timeout: 10000 })
  }

  // ==================== PURCHASE ACTIVITY FORM ====================

  function testPurchaseActivityForm(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    clickHomeButton('Achats')
    cy.url({ timeout: 15000 }).should('include', '/purchases_activity')

    cy.contains("Nouvelle Opération d'Achat", { timeout: 10000 }).should('exist')

    cy.get('input[name*="equipment_name"]').first().clear().type('Test Equipment')
    cy.get('input[name*="description"]').first().clear().type('Test description')
    cy.get('input[name*="unit_price"]').first().clear().type('1000')

    cy.get('[data-testid="input-materials-id"]').first().scrollIntoView()
    cy.get('[data-testid="input-materials-id"]')
      .first()
      .within(() => {
        cy.get('[role="combobox"], .MuiSelect-select').first().click({ force: true })
      })
    cy.get('[id*="menu-"]').contains(material1Mock.name).scrollIntoView().click({ force: true })

    cy.get('input[name*="quantity"]').first().clear().type('10')
    cy.get('input[name*="unit_price"]').last().clear().type('50')

    cy.get('[data-testid="toggle-transport"]').scrollIntoView().click({ force: true })
    cy.wait(300)
    cy.get('input[name="travel_fee"]').clear().type('200')

    cy.intercept(
      'POST',
      '**/purchase_operations',
      mockSuccessResponse({ id: 'new_purchase_id' }),
    ).as('createPurchaseOperation')
    cy.get('[data-testid="submit-purchase"]').click()
    cy.wait('@createPurchaseOperation', { timeout: 10000 })
  }

  // ==================== TRAVEL OPERATION FORM ====================

  function testTravelOperationForm(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    clickHomeButton('Déplacements')
    cy.url({ timeout: 15000 }).should('include', '/travel_equipment_activity')

    cy.contains('Nouvelle Opération de Déplacement', { timeout: 10000 }).should('exist')

    cy.get('textarea[name="comment"]').clear().type('Test travel comment')

    cy.get('[data-testid="input-departure_location_id"]').scrollIntoView().click()
    cy.get('#menu-departure_location_id').should('be.visible')
    cy.get('#menu-departure_location_id')
      .contains(warehouse1Mock.name)
      .scrollIntoView()
      .click({ force: true })

    cy.get('input[name="fee"]').clear().type('150')

    cy.intercept('POST', '**/travel_operations', mockSuccessResponse({ id: 'new_travel_id' })).as(
      'createTravelOperation',
    )
    cy.get('[data-testid="submit-travel"]').scrollIntoView().click({ force: true })
    cy.wait('@createTravelOperation', { timeout: 10000 })
  }

  // ==================== TEST DESKTOP & MOBILE ====================

  it('should navigate employer payment activity (desktop)', () => testEmployerPaymentActivity(true))
  it('should navigate employer payment activity (mobile)', () => testEmployerPaymentActivity(false))
  it('should navigate travel material activity (desktop)', () => testTravelMaterialActivity(true))
  it('should navigate travel material activity (mobile)', () => testTravelMaterialActivity(false))

  it('should navigate and submit expenses activity (desktop)', () => testExpensesActivity(true))
  it('should navigate and submit expenses activity (mobile)', () => testExpensesActivity(false))
  it('should navigate and submit incomes activity (desktop)', () => testIncomesActivity(true))
  it('should navigate and submit incomes activity (mobile)', () => testIncomesActivity(false))

  it('should navigate and submit purchase activity form (desktop)', () =>
    testPurchaseActivityForm(true))
  it('should navigate and submit purchase activity form (mobile)', () =>
    testPurchaseActivityForm(false))
  it('should navigate and submit travel operation form (desktop)', () =>
    testTravelOperationForm(true))
  it('should navigate and submit travel operation form (mobile)', () =>
    testTravelOperationForm(false))
})
