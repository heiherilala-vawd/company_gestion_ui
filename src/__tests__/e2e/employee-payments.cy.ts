import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  employeePayment1Mock,
  crupdateEmployeePaymentsMock,
  createOrUpdateEmployeePayments,
} from '../mocks/responses/employee-payments-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectEmployee,
  selectExpense,
} from '../support/utils.ts'

describe('E2E: Employee Payments', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateEmployeePaymentsMock[0]
    if (isCreating) {
      cy.contains('Create').click()
    } else {
      cy.contains('January salary advance').click()
      cy.wait('@getEmployeePayment')
      cy.contains('Edit').click()
    }
    selectExpense()
    selectEmployee()
    cy.get('[data-testid="input-payment_description"] textarea:visible')
      .clear()
      .type(<string>crupdatedData.payment_description, { force: true })
    cy.get('[data-testid="input-payment_type"] input')
      .clear()
      .type(<string>crupdatedData.payment_type)
    cy.get('button[type="submit"]').click()
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
    cy.get('.RaSidebar-fixed').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-employee-payments"]').click()
    cy.wait('@getEmployeePayments')
  })

  it('should display employee payments list', () => {
    cy.contains(<string>employeePayment1Mock.payment_description).should('exist')
    cy.contains(<string>employeePayment2Mock.payment_description).should('exist')
  })

  it('should show employee payment details', () => {
    cy.contains(<string>employeePayment1Mock.payment_description).click()
    cy.wait('@getEmployeePayment')
    cy.contains(<string>employeePayment1Mock.payment_description).should('exist')
    cy.contains(<string>employeePayment1Mock.employee?.first_name).should('exist')
  })

  it('should create a new employee payment', () => {
    cy.intercept('PUT', '**/employee_payments', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateEmployeePayments(req.body)))
    }).as('createEmployeePayment')
    creatOrUpdate(true)
    cy.wait('@createEmployeePayment')
    cy.url().should('include', '/employee_payments')
  })

  it('should update an existing employee payment', () => {
    cy.intercept('PUT', '**/employee_payments', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateEmployeePayments(req.body)))
    }).as('updateEmployeePayment')
    creatOrUpdate(false)
    cy.wait('@updateEmployeePayment')
    cy.url().should('include', '/employee_payments')
  })

  it('should show error on create failure', () => {
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
    cy.intercept(
      'PUT',
      '**/employee_payments',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateEmployeePaymentFail')
    creatOrUpdate(false)
    cy.wait('@updateEmployeePaymentFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
