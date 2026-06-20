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
  selectEnumType,
  selectIncomeType,
  selectReferenceWithCreate,
} from '../support/utils.ts'
import { user1Mock } from '../mocks/responses/users-api'
import { warehouse1Mock } from '../mocks/responses/warehouses-api'
import { material1Mock } from '../mocks/responses/materials-api'
import { income1Mock } from '../mocks/responses/incomes-api'
import { organization1Mock } from '../mocks/responses/organizations-api'
import { loan1Mock } from '../mocks/responses/loans-api'

function navigateTo(path: string) {
  cy.visit('/#' + path, { failOnStatusCode: false, timeout: 30000 })
  cy.url({ timeout: 15000 }).should('include', path)
  cy.wait(500)
}

describe('E2E: Activity Pages', () => {
  beforeEach(() => {
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  // ==================== EMPLOYER PAYMENT ACTIVITY ====================

  function testEmployerPaymentToggle(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateTo('/employer_payments_activity')

    cy.contains('Valider paiement').should('be.visible')
    cy.contains(income1Mock.organization?.name ?? 'Client Corp').should('be.visible')

    cy.contains('Retourner emprunt').scrollIntoView().click({ force: true })
    cy.wait(300)
    cy.contains('Emprunts en défaut').should('be.visible')
    cy.contains('Emprunts actifs').should('be.visible')
    cy.contains('Banque Populaire').should('be.visible')
  }

  function testPaymentValidation(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateTo('/employer_payments_activity')

    cy.contains(income1Mock.organization?.name ?? 'Client Corp').should('be.visible')

    cy.contains('td', income1Mock.organization?.name ?? 'Client Corp')
      .parent('tr')
      .within(() => {
        cy.get('input[type="number"]').clear().type('5000')
      })

    cy.contains('td', income1Mock.organization?.name ?? 'Client Corp')
      .parent('tr')
      .contains('button', 'Valider')
      .click()

    cy.contains('Confirmer le paiement').should('be.visible')

    cy.intercept('PUT', '**/incomes_receipts', mockSuccessResponse({})).as('createReceipt')
    cy.contains('button', 'Confirmer le paiement').click()
    cy.wait('@createReceipt', { timeout: 20000 })
  }

  function testLoanRepayment(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateTo('/employer_payments_activity')
    cy.wait(300)

    cy.contains('Retourner emprunt').scrollIntoView().click({ force: true })
    cy.contains('Emprunts actifs').should('be.visible')
    cy.contains(loan1Mock.organization.name).should('be.visible')

    cy.contains('td', loan1Mock.organization.name)
      .parent('tr')
      .within(() => {
        cy.get('input[type="number"]').clear().type('5000')
      })

    cy.contains('td', loan1Mock.organization.name)
      .parent('tr')
      .contains('button', 'Valider')
      .click()

    cy.contains('Confirmer le remboursement').should('be.visible')
    cy.intercept('PUT', '**/loan_repayments', mockSuccessResponse({})).as('createRepayment')
    cy.contains('button', 'Confirmer le remboursement').click()
    cy.wait('@createRepayment', { timeout: 20000 })
  }

  // ==================== TRAVEL MATERIAL ACTIVITY ====================

  function testTravelMaterialContainerGrouping(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateTo('/travel_materials_activity')

    cy.contains('Lieu de réception').should('be.visible')
    cy.contains('Cement').should('be.visible')
    cy.contains('Excavator XL200').should('be.visible')
    cy.contains('Équipement').should('be.visible')
    cy.contains('Matériau').should('be.visible')
    cy.contains('Blue Box').should('be.visible')
  }

  // ==================== EXPENSES ACTIVITY ====================

  function testExpensesActivity(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateTo('/expenses_activity')

    cy.get('[data-testid="input-bank_name"] input').clear().type('BNP Paribas Test')
    cy.get('[data-testid="input-description"] textarea:visible')
      .first()
      .clear()
      .type('Test bank fee')
    cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
      .clear()
      .type('5000')
    cy.get('[data-testid="input-expense-form"] [data-testid="input-comment"] textarea:visible')
      .clear()
      .type('Bank fee comment')
    cy.intercept('PUT', '**/bank_fees', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateBankFees(req.body)))
    }).as('createBankFee')
    cy.get('button[type="submit"]').scrollIntoView().click({ force: true })
    cy.wait('@createBankFee', { timeout: 20000 })
    cy.wait(2000)

    navigateTo('/expenses_activity')
    cy.wait(500)

    cy.contains('Paiement salarié').scrollIntoView().click({ force: true })
    cy.wait(300)
    cy.get(`[data-testid="employee-item-${user1Mock.id}"]`).click()
    cy.get('[data-testid="payer-button"]').click()
    cy.get('[data-testid="input-payment_description"] textarea:visible').clear().type('Test salary')
    selectEnumType('input-payment_type', 'Mensuel')
    cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
      .clear()
      .type('3000')
    cy.get('[data-testid="input-expense-form"] [data-testid="input-comment"] textarea:visible')
      .clear()
      .type('Employee payment comment')
    cy.intercept('PUT', '**/employee_payments', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateEmployeePayments(req.body)))
    }).as('createEmployeePayment')
    cy.get('button[type="submit"]').scrollIntoView().click({ force: true })
    cy.wait('@createEmployeePayment', { timeout: 20000 })
    cy.wait(2000)

    navigateTo('/expenses_activity')
    cy.wait(500)

    cy.contains('Autre dépense').scrollIntoView().click({ force: true })
    cy.wait(300)
    cy.get('[data-testid="input-description"] textarea:visible')
      .first()
      .clear()
      .type('Test other expense')
    cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
      .clear()
      .type('2000')
    cy.get('[data-testid="input-expense-form"] [data-testid="input-comment"] textarea:visible')
      .clear()
      .type('Other expense comment')
    cy.intercept('PUT', '**/other_expenses', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateOtherExpenses(req.body)))
    }).as('createOtherExpense')
    cy.get('button[type="submit"]').scrollIntoView().click({ force: true })
    cy.wait('@createOtherExpense', { timeout: 20000 })
  }

  // ==================== INCOMES ACTIVITY ====================

  function testIncomesActivity(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    navigateTo('/incomes_activity')

    selectIncomeType('income_type_id')
    selectReferenceWithCreate(
      'input-organizations-id',
      'organization_id',
      <string>organization1Mock.name,
    )
    cy.get('[data-testid="input-invoice_reference"] input').clear().type('INV-TEST-001')
    cy.get('[data-testid="input-amount"] input').clear().type('15000')
    cy.get('[data-testid="input-description"] textarea:visible').clear().type('Test income')
    cy.get('[data-testid="input-comment"] textarea:visible').clear().type('Test income comment')
    cy.intercept('PUT', '**/incomes', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateIncomes(req.body)))
    }).as('createIncome')
    cy.get('button[type="submit"]').scrollIntoView().click({ force: true })
    cy.wait('@createIncome', { timeout: 10000 })

    navigateTo('/incomes_activity')
    cy.wait(300)

    cy.contains('button', 'Emprunts').scrollIntoView().click({ force: true })
    cy.wait(300)
    cy.get('[data-testid="input-organizations-id"]')
      .scrollIntoView()
      .within(() => {
        cy.get('[role="combobox"], .MuiSelect-select').first().click({ force: true })
      })
    cy.get('[role="option"]', { timeout: 15000 }).should('be.visible')
    cy.contains('[role="option"]', 'Banque Populaire').scrollIntoView().click({ force: true })
    cy.get('[role="option"]').should('not.exist')
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
    navigateTo('/purchase_operation?mode=full')

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
    navigateTo('/travel_operation?mode=equipment')

    cy.contains('Déplacer des équipements', { timeout: 10000 }).should('exist')

    cy.get('[data-testid="toggle-comment"]').click()
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

  it('should toggle employer payment views (desktop)', () => testEmployerPaymentToggle(true))
  it('should toggle employer payment views (mobile)', () => testEmployerPaymentToggle(false))

  it('should validate payment on employer payment (desktop)', () => testPaymentValidation(true))
  it('should validate payment on employer payment (mobile)', () => testPaymentValidation(false))

  it('should repay loan on employer payment (desktop)', () => testLoanRepayment(true))
  it('should repay loan on employer payment (mobile)', () => testLoanRepayment(false))
  it('should display travel materials grouped by container (desktop)', () =>
    testTravelMaterialContainerGrouping(true))

  it('should display travel materials grouped by container (mobile)', () =>
    testTravelMaterialContainerGrouping(false))

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

// ==================== TRAVEL OPERATION MATERIALS STOCK DISPLAY ====================

function testTravelOperationMaterialsForm(desktop: boolean) {
  if (!desktop) cy.viewport(375, 667)

  cy.intercept('GET', '**/materials*warehouse_id*', mockSuccessResponse([material1Mock])).as(
    'getMaterialsWithStock',
  )

  navigateTo('/travel_operation?mode=materials')

  cy.contains('Déplacer des matériaux', { timeout: 10000 }).should('exist')

  cy.get('.button-add-material_lines').click()
  cy.wait(300)

  cy.get('[data-testid="input-departure_location_id"]').scrollIntoView().click()
  cy.get('#menu-departure_location_id').should('be.visible')
  cy.get('#menu-departure_location_id')
    .contains(warehouse1Mock.name)
    .scrollIntoView()
    .click({ force: true })

  cy.wait('@getMaterialsWithStock', { timeout: 10000 })

  cy.get('[data-testid="input-materials-id"]')
    .first()
    .scrollIntoView()
    .within(() => {
      cy.get('[role="combobox"], .MuiSelect-select').first().click({ force: true })
    })

  cy.get('[id*="menu-"]').contains('50 SAC').should('be.visible')
}

// Separate suite for stock display tests — isolated beforeEach
describe('E2E: Travel Operation Materials Stock Display', () => {
  beforeEach(() => {
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  it('should show material stock quantity in travel operation (desktop)', () =>
    testTravelOperationMaterialsForm(true))
  it('should show material stock quantity in travel operation (mobile)', () =>
    testTravelOperationMaterialsForm(false))
})
