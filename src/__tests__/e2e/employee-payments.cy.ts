import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  employeePayment1Mock,
  crupdateEmployeePaymentsMock,
  createOrUpdateEmployeePayments,
  employeePayment2Mock,
} from '../mocks/responses/employee-payments-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectJob,
  selectEnumType,
} from '../support/utils.ts'
import { user2Mock } from '../mocks/responses/users-api.ts'

describe('E2E: Employee Payments', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateEmployeePaymentsMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
      cy.get(`[data-testid="employee-item-${user2Mock.id}"]`).click()
      cy.get('[data-testid="payer-button"]').click()
    } else {
      cy.contains(<string>employeePayment1Mock.users[0].first_name).click()
      cy.wait('@getEmployeePayment')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-payment_description"] textarea:visible')
      .first()
      .clear()
      .type(<string>crupdatedData.payment_description, { force: true })
    selectEnumType('input-payment_type', 'Avance')

    if (!isCreating) {
      selectJob('expense\\.job_id')
    }
    cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
      .clear()
      .type('10000')

    cy.get('button[type="submit"]').click()
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-employee-payments"]').click()
    cy.wait('@getEmployeePayments')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-employee-payments"]').scrollIntoView()
    cy.get('[data-testid="menu-employee-payments"]').click({ force: true })
    cy.wait('@getEmployeePayments')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0) // clique hors menu
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>employeePayment1Mock.users[0].first_name).should('exist')
    cy.contains(<string>employeePayment2Mock.users[0].first_name).should('exist')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>employeePayment1Mock.users[0].first_name).click()
    cy.wait('@getEmployeePayment')
    cy.contains(<string>employeePayment1Mock.users[0].first_name).should('exist')
    cy.contains(<string>employeePayment1Mock.payment_description).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/employee_payments', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateEmployeePayments(req.body)))
    }).as('createEmployeePayment')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createEmployeePayment')
    cy.url().should('include', '/employee_payments')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/employee_payments', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateEmployeePayments(req.body)))
    }).as('updateEmployeePayment')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateEmployeePayment')
    cy.url().should('include', '/employee_payments')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display employee payments list', () => showList(true))
  it('should show employee payment details', () => showDetails(true))
  it('should create a new employee payment', () => canCreate(true))
  it('should update an existing employee payment', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/employee_payments',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createEmployeePaymentFail')
    creatOrUpdate(true)
    cy.wait('@createEmployeePaymentFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/employee_payments',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateEmployeePaymentFail')
    creatOrUpdate(false)
    cy.wait('@updateEmployeePaymentFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display employee payments list on mobile', () => showList(false))
  it('should show employee payment details on mobile', () => showDetails(false))
  it('should create a new employee payment on mobile', () => canCreate(false))
  it('should update an existing employee payment on mobile', () => canUpdate(false))
})
