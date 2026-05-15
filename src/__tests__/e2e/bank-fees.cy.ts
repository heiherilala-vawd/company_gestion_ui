import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  bankFee1Mock,
  crupdateBankFeesMock,
  createOrUpdateBankFees,
} from '../mocks/responses/bank-fees-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectExpense,
  selectJob,
} from '../support/utils.ts'

describe('E2E: Bank Fees', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateBankFeesMock[0]
    if (isCreating) {
      cy.get('[data-testid="AddIcon"]').click()
      cy.get('[data-testid="input-id"] input').then(($input) => {
        $input.val('newId')
        $input.trigger('change')
      })
    } else {
      cy.contains('BNP Paribas').click()
      cy.wait('@getBankFee')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-bank_name"] input')
      .clear()
      .type(<string>crupdatedData.bank_name)
    cy.get('[data-testid="input-description"] textarea:visible')
      .first()
      .clear()
      .type(<string>crupdatedData.description, { force: true })

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
    cy.get('[data-testid="menu-bank-fees"]').click()
    cy.wait('@getBankFees')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[class*="RaSidebarToggleButton"]').first().click()
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-bank-fees"]').click()
    cy.wait('@getBankFees')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0) // clique hors menu
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains('BNP Paribas').should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>bankFee1Mock.bank_name).click()
    cy.wait('@getBankFee')
    cy.contains(<string>bankFee1Mock.bank_name).should('exist')
    cy.contains(<string>bankFee1Mock.description).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/bank_fees', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateBankFees(req.body)))
    }).as('createBankFee')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createBankFee')
    cy.url().should('include', '/bank_fees')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/bank_fees', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateBankFees(req.body)))
    }).as('updateBankFee')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateBankFee')
    cy.url().should('include', '/bank_fees')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display bank fees list', () => showList(true))
  it('should show bank fee details', () => showDetails(true))
  it('should create a new bank fee', () => canCreate(true))
  it('should update an existing bank fee', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
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
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/bank_fees',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateBankFeeFail')
    creatOrUpdate(false)
    cy.wait('@updateBankFeeFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display bank fees list on mobile', () => showList(false))
  it('should show bank fee details on mobile', () => showDetails(false))
  it('should create a new bank fee on mobile', () => canCreate(false))
  it('should update an existing bank fee on mobile', () => canUpdate(false))
})
