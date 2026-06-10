import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  purchaseOrder1Mock,
  purchaseOrder2Mock,
  createOrUpdatePurchaseOrders,
  crupdatePurchaseOrdersMock,
} from '../mocks/responses/purchase-orders-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Purchase Orders', () => {
  function selectReferenceMobile(testId: string, optionText: string) {
    cy.get(`[data-testid="${testId}"]`)
      .scrollIntoView()
      .within(() => {
        cy.get('[role="combobox"], .MuiSelect-select').first().click({ force: true })
      })
    cy.get('[role="option"]', { timeout: 10000 }).should('be.visible')
    cy.contains('[role="option"]', optionText).click({ force: true })
  }

  function clickRow(isComputerView: boolean) {
    if (isComputerView) {
      cy.contains(<string>purchaseOrder1Mock.supplier.name || '').click()
    } else {
      cy.contains(<string>purchaseOrder1Mock.status).click()
    }
  }

  function creatOrUpdate(isCreating: boolean, isComputerView: boolean) {
    const crupdatedData = crupdatePurchaseOrdersMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
    } else {
      clickRow(isComputerView)
      cy.wait('@getPurchaseOrder')
      cy.get('.RaEditButton-root').click({ force: true })
    }
    selectReferenceMobile('input-supplier_id', 'Fournitures BTP SARL')
    cy.get('[data-testid="input-order_date"] input')
      .clear()
      .type(<string>crupdatedData.order_date)
    cy.get('[data-testid="input-total_amount"] input')
      .clear()
      .type(String(<number>crupdatedData.total_amount))
    if (!isCreating) {
      selectReferenceMobile('input-job_id', 'Construction of Building A')
    }
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-purchase-orders"]').click()
    cy.wait('@getPurchaseOrders')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-purchase-orders"]').scrollIntoView()
    cy.get('[data-testid="menu-purchase-orders"]').click({ force: true })
    cy.wait('@getPurchaseOrders')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    if (isComputerView) {
      cy.contains(<string>purchaseOrder1Mock.supplier.name || '').should('be.visible')
    }
    cy.contains(<string>purchaseOrder1Mock.status).should('be.visible')
    cy.contains(<string>purchaseOrder2Mock.status).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    clickRow(isComputerView)
    cy.wait('@getPurchaseOrder')
    cy.contains(<string>purchaseOrder1Mock.supplier?.name || '').should('be.visible')
    cy.contains(<string>purchaseOrder1Mock.status).should('be.visible')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/companies/*/purchase_orders*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdatePurchaseOrders(req.body)))
    }).as('createPurchaseOrder')
    creatOrUpdate(true, isComputerView)
    cy.wait(3000)
    cy.wait('@createPurchaseOrder')
    cy.url().should('include', '/purchase_orders')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/companies/*/purchase_orders*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdatePurchaseOrders(req.body)))
    }).as('updatePurchaseOrder')
    creatOrUpdate(false, isComputerView)
    cy.wait(3000)
    cy.wait('@updatePurchaseOrder')
    cy.url().should('include', '/purchase_orders')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display purchase orders list', () => showList(true))
  it('should show purchase order details', () => showDetails(true))
  it('should create a new purchase order', () => canCreate(true))
  it('should update an existing purchase order', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/companies/*/purchase_orders*',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createPurchaseOrderFail')
    creatOrUpdate(true, true)
    cy.wait('@createPurchaseOrderFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/companies/*/purchase_orders*',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updatePurchaseOrderFail')
    creatOrUpdate(false, true)
    cy.wait('@updatePurchaseOrderFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display purchase orders list on mobile', () => showList(false))
  it('should show purchase order details on mobile', () => showDetails(false))
  it('should create a new purchase order on mobile', () => canCreate(false))
  it('should update an existing purchase order on mobile', () => canUpdate(false))
})
