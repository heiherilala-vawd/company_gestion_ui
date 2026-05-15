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
  function creatOrUpdateEquipment(isCreating: boolean) {
    if (isCreating) {
      cy.get('[data-testid="AddIcon"]').click()
    } else {
      cy.contains(<string>purchase1Mock.equipment?.name).click()
      cy.wait('@getPurchase')
      cy.get('.RaEditButton-root').click()
    }
    selectWarehouse('supplier_id')
    cy.get('[data-testid="input-is_equipment"]').click()
    selectEquipment('equipment')

    if (!isCreating) {
      selectJob('expense\\.job_id')
    }
    cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
      .clear()
      .type('10000')

    cy.get('button[type="submit"]').click()
  }

  function creatOrUpdateMaterial(isCreating: boolean) {
    const crupdatedData = crupdatePurchasesMock[0]
    if (isCreating) {
      cy.get('[data-testid="AddIcon"]').click()
    } else {
      cy.contains(<number>purchase1Mock.quantity).click()
      cy.wait('@getPurchase')
      cy.get('.RaEditButton-root').click()
    }
    selectWarehouse('supplier_id')
    selectMaterial('material')
    cy.get('[data-testid="input-quantity"] input')
      .clear()
      .type(String(<number>crupdatedData.quantity))

    if (!isCreating) {
      selectJob('expense\\.job_id')
    }
    cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
      .clear()
      .type('1520')

    cy.get('button[type="submit"]').click()
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-purchases"]').click()
    cy.wait('@getPurchases')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[class*="RaSidebarToggleButton"]').first().click()
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-purchases"]').click()
    cy.wait('@getPurchases')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0) // clique hors menu
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>purchase1Mock.equipment?.name).should('be.visible')
    cy.contains(<string>purchase2Mock.equipment?.name).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>purchase1Mock.equipment?.name).click()
    cy.wait('@getPurchase')
    cy.contains(<number>purchase1Mock.quantity).should('exist')
    cy.contains(<number>purchase1Mock.expense?.amount).should('exist')
    cy.contains(<string>purchase1Mock.material?.name).should('exist')
    cy.contains(<string>purchase1Mock.equipment?.name).should('exist')
    cy.contains(<string>purchase1Mock.expense?.job_id).should('exist')
    cy.contains(<string>purchase1Mock.expense?.comment).should('exist')
  }

  function canCreateEquipment(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/purchases', (req) => {
      req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
    }).as('createPurchase')
    creatOrUpdateEquipment(true)
    cy.wait(3000)
    cy.wait('@createPurchase')
    cy.url().should('include', '/purchases')
  }

  function canCreateMaterial(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/purchases', (req) => {
      req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
    }).as('createPurchase')
    creatOrUpdateMaterial(true)
    cy.wait(3000)
    cy.wait('@createPurchase')
    cy.url().should('include', '/purchases')
  }

  function canUpdatePurchase(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/purchases', (req) => {
      req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
    }).as('updatePurchase')
    creatOrUpdateMaterial(false)
    cy.wait(3000)
    cy.wait('@updatePurchase')
    cy.url().should('include', '/purchases')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display purchases list', () => showList(true))
  it('should show purchase details', () => showDetails(true))
  it('should create a new purchase equipment', () => canCreateEquipment(true))
  it('should create a new purchase material', () => canCreateMaterial(true))
  it('should update an existing purchase', () => canUpdatePurchase(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/purchases',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createPurchaseFail')
    creatOrUpdateMaterial(true)
    cy.wait('@createPurchaseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/purchases',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updatePurchaseFail')
    creatOrUpdateEquipment(false)
    cy.wait('@updatePurchaseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display purchases list on mobile', () => showList(false))
  it('should show purchase details on mobile', () => showDetails(false))
  it('should create a new purchase equipment on mobile', () => canCreateEquipment(false))
  it('should create a new purchase material on mobile', () => canCreateMaterial(false))
  it('should update an existing purchase on mobile', () => canUpdatePurchase(false))
})
