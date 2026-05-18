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
import { income1Mock } from '../mocks/responses/incomes-api'
import { loan1Mock } from '../mocks/responses/loans-api'
import { equipment1Mock } from '../mocks/responses/equipment-api'

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
    cy.contains('button', label).click({ force: true })
  }

  // ==================== HOME PAGE BUTTONS ====================

  function testHomePageButtons(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    goHome()
    cy.contains('Actions rapides').should('be.visible')
    cy.contains('Validations').should('be.visible')
    const buttons = [
      'Achats',
      'Déplacements',
      'Revenus / Emprunts',
      'Dépenses',
      'Valider paiement / Retourner emprunt',
      'Valider Réception',
    ]
    buttons.forEach((label) => cy.contains('button', label).should('be.visible'))
  }

  // ==================== EMPLOYER PAYMENT ACTIVITY ====================

  function testEmployerPaymentToggle(desktop: boolean) {
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

  function testPaymentValidation(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    clickHomeButton('Valider paiement / Retourner emprunt')
    cy.url({ timeout: 15000 }).should('include', '/employer_payments_activity')
    cy.wait(500)

    // Make sure content is visible
    cy.contains(income1Mock.source_organization).should('be.visible')

    // Find income row, type amount, click Valider
    cy.contains('td', income1Mock.source_organization)
      .parent('tr')
      .within(() => {
        cy.get('input[type="number"]').clear().type('5000')
      })

    // Click Valider button
    cy.contains('td', income1Mock.source_organization)
      .parent('tr')
      .contains('button', 'Valider')
      .click()

    // Confirm dialog
    cy.contains('Confirmer le paiement').should('be.visible')

    // Intercept and confirm
    cy.intercept('PUT', '**/receipts', mockSuccessResponse({})).as('createReceipt')
    cy.contains('button', 'Confirmer le paiement').click()
    cy.wait('@createReceipt', { timeout: 20000 })
  }

  function testLoanRepayment(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    clickHomeButton('Valider paiement / Retourner emprunt')
    cy.url({ timeout: 15000 }).should('include', '/employer_payments_activity')
    cy.wait(300)

    cy.contains('Retourner emprunt').scrollIntoView().click({ force: true })
    cy.wait(500)
    cy.contains('Emprunts actifs').should('be.visible')
    cy.contains(loan1Mock.lender).should('be.visible')

    cy.contains('td', loan1Mock.lender)
      .parent('tr')
      .within(() => {
        cy.get('input[type="number"]').clear().type('5000')
      })

    cy.contains('td', loan1Mock.lender).parent('tr').contains('button', 'Valider').click()

    cy.contains('Confirmer le remboursement').should('be.visible')
    cy.intercept('PUT', '**/repayments', mockSuccessResponse({})).as('createRepayment')
    cy.contains('button', 'Confirmer le remboursement').click()
    cy.wait('@createRepayment', { timeout: 20000 })
  }

  // ==================== TRAVEL MATERIAL ACTIVITY ====================

  function testTravelMaterialToggle(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    clickHomeButton('Valider Réception')
    cy.url({ timeout: 15000 }).should('include', '/travel_materials_activity')
    cy.wait(500)

    cy.contains('Lieu de réception').should('be.visible')
    cy.contains(materialWarehouse1Mock.material?.name).should('be.visible')
    cy.get('[data-testid="toggle-equipment"]').scrollIntoView().click({ force: true })
  }

  function testMaterialsReception(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    clickHomeButton('Valider Réception')
    cy.url({ timeout: 15000 }).should('include', '/travel_materials_activity')
    cy.wait(500)

    cy.contains(material1Mock.name).should('be.visible')

    cy.contains('td', material1Mock.name).parent('tr').find('td').first().click({ force: true })
    cy.contains('td', material1Mock.name)
      .parent('tr')
      .find('input[type="number"]')
      .clear()
      .type('10')

    cy.get('[data-testid="warehouse-select"]').select('wh1_id')
    cy.wait(300)

    cy.contains('Effectuer la validation (1)').click({ force: true })
    cy.wait(300)
    cy.contains('Résumé de la validation').should('be.visible')
    cy.intercept('POST', '**/travel_operations', mockSuccessResponse({ id: 'new_travel_id' })).as(
      'createTravelOperation',
    )
    cy.get('.MuiDialogActions-root').contains('button', 'Effectuer la validation').click()
    cy.wait('@createTravelOperation', { timeout: 10000 })
  }

  function testEquipmentReception(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)
    clickHomeButton('Valider Réception')
    cy.url({ timeout: 15000 }).should('include', '/travel_materials_activity')
    cy.wait(500)

    cy.get('[data-testid="toggle-equipment"]').scrollIntoView().click({ force: true })
    cy.wait('@getEquipments', { timeout: 10000 })
    cy.contains('td', equipment1Mock.name).should('be.visible')

    cy.contains('td', equipment1Mock.name).parent('tr').find('td').first().click({ force: true })
    cy.wait(500)
    cy.contains('Lieu de réception').should('be.visible')
    cy.get('[data-testid="warehouse-select"]').select('wh1_id')
    cy.wait(300)

    cy.contains('button', /Effectuer la validation \([1-9]/).click({ force: true })
    cy.wait(300)
    cy.contains('Résumé de la validation').should('be.visible')
    cy.intercept('PUT', '**/equipment*', mockSuccessResponse({})).as('updateEquipment')
    cy.get('.MuiDialogActions-root').contains('button', 'Effectuer la validation').click()
    cy.wait('@updateEquipment', { timeout: 10000 })
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
    cy.get('[data-testid="input-expense-form"] [data-testid="input-comment"] textarea:visible')
      .clear()
      .type('Bank fee comment')
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
    cy.get('[data-testid="input-expense-form"] [data-testid="input-comment"] textarea:visible')
      .clear()
      .type('Employee payment comment')
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
    cy.get('[data-testid="input-expense-form"] [data-testid="input-comment"] textarea:visible')
      .clear()
      .type('Other expense comment')
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
    cy.get('[data-testid="input-comment"] textarea:visible').clear().type('Test income comment')
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

  it('should display all home page buttons (desktop)', () => testHomePageButtons(true))
  it('should display all home page buttons (mobile)', () => testHomePageButtons(false))

  it('should toggle employer payment views (desktop)', () => testEmployerPaymentToggle(true))
  it('should toggle employer payment views (mobile)', () => testEmployerPaymentToggle(false))

  it('should validate payment on employer payment (desktop)', () => testPaymentValidation(true))
  it('should validate payment on employer payment (mobile)', () => testPaymentValidation(false))

  it('should repay loan on employer payment (desktop)', () => testLoanRepayment(true))
  it('should repay loan on employer payment (mobile)', () => testLoanRepayment(false))

  it('should toggle travel material views (desktop)', () => testTravelMaterialToggle(true))
  it('should toggle travel material views (mobile)', () => testTravelMaterialToggle(false))

  it('should validate materials reception (desktop)', () => testMaterialsReception(true))
  it('should validate materials reception (mobile)', () => testMaterialsReception(false))

  it('should validate equipment reception (desktop)', () => testEquipmentReception(true))
  it('should validate equipment reception (mobile)', () => testEquipmentReception(false))

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
