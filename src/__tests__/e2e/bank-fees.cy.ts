import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  bankFee1Mock,
  bankFee2Mock,
  bankFeesMock,
  crupdateBankFeesMock,
  createOrUpdateBankFees,
} from '../mocks/responses/bank-fees-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectExpense,
} from '../support/utils.ts'

describe('E2E: Bank Fees', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateBankFeesMock[0]
    if (isCreating) {
      cy.contains('Create').click()
      cy.get('[data-testid="input-id"] input').then(($input) => {
        // Modification directe de la valeur
        $input.val('newId')
        // Déclencher l'événement onChange pour React
        $input.trigger('change')
      })
    } else {
      cy.contains('BNP Paribas').click()
      cy.wait('@getBankFee')
      cy.contains('Edit').click()
    }
    selectExpense()
    cy.get('[data-testid="input-bank_name"] input')
      .clear()
      .type(<string>crupdatedData.bank_name)
    cy.get('[data-testid="input-description"] textarea:visible')
      .clear()
      .type(<string>crupdatedData.description, { force: true })
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
    cy.get('[data-testid="menu-bank-fees"]').click()
    cy.wait('@getBankFees')
  })

  it('should display bank fees list', () => {
    cy.contains('BNP Paribas').should('be.visible')
  })

  it('should show bank fee details', () => {
    cy.contains(<string>bankFee1Mock.bank_name).click()
    cy.wait('@getBankFee')
    cy.contains(<string>bankFee1Mock.bank_name).should('exist')
    cy.contains(<string>bankFee1Mock.description).should('exist')
  })

  it('should create a new bank fee', () => {
    cy.intercept('PUT', '**/bank_fees', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateBankFees(req.body)))
    }).as('createBankFee')
    creatOrUpdate(true)
    cy.wait('@createBankFee')
    cy.url().should('include', '/bank_fees')
  })

  it('should update an existing bank fee', () => {
    cy.intercept('PUT', '**/bank_fees', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateBankFees(req.body)))
    }).as('updateBankFee')
    creatOrUpdate(false)
    cy.wait('@updateBankFee')
    cy.url().should('include', '/bank_fees')
  })

  it('should show error on create failure', () => {
    cy.intercept(
      'PUT',
      '**/bank_fees',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createBankFeeFail')
    creatOrUpdate(true)
    cy.wait('@createBankFeeFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    cy.intercept(
      'PUT',
      '**/bank_fees',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateBankFeeFail')
    creatOrUpdate(false)
    cy.wait('@updateBankFeeFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
