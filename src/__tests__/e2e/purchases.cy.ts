import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  purchase1Mock,
  purchase2Mock,
  crupdatePurchasesMock,
  createOrUpdatePurchases,
} from '../mocks/responses/purchases-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectExpense,
  selectEquipment,
  selectMaterial,
  selectWarehouse,
  selectJob,
} from '../support/utils.ts'

describe('E2E: Purchases', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdatePurchasesMock[0]
    if (isCreating) {
      cy.contains('Create').click()
    } else {
      cy.contains(<number>purchase1Mock.quantity).click()
      cy.wait('@getPurchase')
      cy.contains('Edit').click()
    }
    selectWarehouse('supplier_id')
    selectEquipment('equipment_id')
    selectMaterial('material_id')
    cy.get('[data-testid="input-quantity"] input')
      .clear()
      .type(String(<number>crupdatedData.quantity))

    selectJob('expense\\.job_id')
    cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
      .clear()
      .type('10000')
    cy.get('[data-testid="input-expense-form"] [data-testid="input-description"] textarea:visible')
      .clear()
      .type('description of job', { force: true })
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
    cy.get('[data-testid="menu-purchases"]').click()
    cy.wait('@getPurchases')
  })

  it('should display purchases list', () => {
    cy.contains(<number>purchase1Mock.quantity).should('be.visible')
    cy.contains(<number>purchase2Mock.expense?.amount).should('be.visible')
  })

  it('should show purchase details', () => {
    cy.contains(<number>purchase1Mock.quantity).click()
    cy.wait('@getPurchase')
    cy.contains(<number>purchase1Mock.quantity).should('exist')
    cy.contains(<number>purchase1Mock.expense?.amount).should('exist')
    cy.contains(<string>purchase1Mock.material?.name).should('exist')
    cy.contains(<string>purchase1Mock.equipment?.name).should('exist')
    cy.contains(<string>purchase1Mock.expense?.job_id).should('exist')
    cy.contains(<string>purchase1Mock.expense?.comment).should('exist')
  })

  it('should create a new purchase', () => {
    cy.intercept('PUT', '**/purchases', (req) => {
      req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
    }).as('createPurchase')
    creatOrUpdate(true)
    cy.wait('@createPurchase')
    cy.url().should('include', '/purchases')
  })

  it('should update an existing purchase', () => {
    cy.intercept('PUT', '**/purchases', (req) => {
      req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
    }).as('updatePurchase')
    creatOrUpdate(false)
    cy.wait('@updatePurchase')
    cy.url().should('include', '/purchases')
  })

  it('should show error on create failure', () => {
    cy.intercept(
      'PUT',
      '**/purchases',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createPurchaseFail')
    creatOrUpdate(true)
    cy.wait('@createPurchaseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    cy.intercept(
      'PUT',
      '**/purchases',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updatePurchaseFail')
    creatOrUpdate(false)
    cy.wait('@updatePurchaseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
