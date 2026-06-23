import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  purchase1Mock,
  purchase2Mock,
  crupdatePurchasesMock,
  createOrUpdatePurchases,
} from '../mocks/responses/purchases-api'
import { expense1Mock } from '../mocks/responses/expenses-api'
import { supplier1Mock } from '../mocks/responses/suppliers-api'
import {
  expandMonetarySections,
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectEquipment,
  selectMaterial,
  selectReferenceWithCreate,
  selectJob,
} from '../support/utils.ts'

describe('E2E: Purchases', () => {
  function selectReferenceMobile(testId: string, optionText: string) {
    cy.get(`[data-testid="${testId}"]`)
      .scrollIntoView()
      .within(() => {
        cy.get('[role="combobox"], .MuiSelect-select').first().click({ force: true })
      })
    cy.get('[role="option"]', { timeout: 10000 }).should('be.visible')
    cy.contains('[role="option"]', optionText).click({ force: true })
    cy.get('[role="option"]').should('not.exist')
  }

  function selectSupplier() {
    selectReferenceMobile('input-suppliers-id', 'Fournitures BTP SARL')
  }

  function selectSupplierForced() {
    selectReferenceWithCreate('input-suppliers-id', 'supplier', <string>supplier1Mock.name)
  }

  function creatOrUpdateEquipment(isCreating: boolean) {
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click({ force: true })
      selectSupplier()
      cy.get('input[name*="equipment_name"]').first().clear().type('Test Equipment')
      cy.get('input[name*="unit_price"]').first().clear().type('10000')
      cy.get('[data-testid="submit-purchase"]').click({ force: true })
    } else {
      cy.contains(<string>purchase1Mock.equipment?.name).click({ force: true })
      cy.wait('@getPurchase')
      cy.get('.RaEditButton-root').click({ force: true })
      selectSupplier()
      cy.get('[data-testid="input-is_equipment"]').click({ force: true })
      selectReferenceMobile('input-equipment-id', 'Excavator')
      selectReferenceMobile('input-jobs-id', 'Construction of Building A')
      cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
        .clear({ force: true })
        .type('10000', { force: true })
      cy.get('button[type="submit"]').click({ force: true })
    }
  }

  function creatOrUpdateMaterial(isCreating: boolean) {
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click({ force: true })
      selectSupplier()
      cy.get('[data-testid="input-materials-id"]').first().scrollIntoView()
      cy.get('[data-testid="input-materials-id"]')
        .first()
        .within(() => {
          cy.get('[role="combobox"], .MuiSelect-select').first().click({ force: true })
        })
      cy.get('[role="option"]').contains('Cement').scrollIntoView().click({ force: true })
      cy.get('[role="option"]').should('not.exist')
      cy.get('input[name*="quantity"]').first().clear().type('10')
      cy.get('input[name*="unit_price"]').last().clear().type('50')
      cy.get('[data-testid="submit-purchase"]').click({ force: true })
    } else {
      const crupdatedData = crupdatePurchasesMock[0]
      cy.contains(<number>purchase1Mock.quantity).click({ force: true })
      cy.wait('@getPurchase')
      cy.get('.RaEditButton-root').click({ force: true })
      selectSupplier()
      selectReferenceMobile('input-materials-id', 'Cement')
      cy.get('[data-testid="input-quantity"] input')
        .clear({ force: true })
        .type(String(<number>crupdatedData.quantity), { force: true })
      selectReferenceMobile('input-jobs-id', 'Construction of Building A')
      cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
        .clear({ force: true })
        .type('1520', { force: true })
      cy.get('button[type="submit"]').click({ force: true })
    }
  }

  function creatOrUpdateEquipmentForced(isCreating: boolean) {
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click({ force: true })
      selectSupplierForced()
      cy.get('input[name*="equipment_name"]').first().clear().type('Test Equipment')
      cy.get('input[name*="unit_price"]').first().clear().type('10000')
      cy.get('[data-testid="submit-purchase"]').click({ force: true })
    } else {
      cy.contains(<string>purchase1Mock.equipment?.name).click({ force: true })
      cy.wait('@getPurchase')
      cy.get('.RaEditButton-root').click()
      selectSupplierForced()
      selectEquipment('equipment')
      selectJob('expense\\.job_id')
      cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
        .clear()
        .type('10000')
      cy.get('button[type="submit"]').click({ force: true })
    }
  }

  function creatOrUpdateMaterialForced(isCreating: boolean) {
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click({ force: true })
      selectSupplierForced()
      cy.get('[data-testid="input-materials-id"]').first().scrollIntoView()
      cy.get('[data-testid="input-materials-id"]')
        .first()
        .within(() => {
          cy.get('[role="combobox"], .MuiSelect-select').first().click({ force: true })
        })
      cy.get('[role="option"]').contains('Cement').scrollIntoView().click({ force: true })
      cy.get('[role="option"]').should('not.exist')
      cy.get('input[name*="quantity"]').first().clear().type('10')
      cy.get('input[name*="unit_price"]').first().clear().type('50')
      cy.get('[data-testid="submit-purchase"]').click({ force: true })
    } else {
      const crupdatedData = crupdatePurchasesMock[0]
      cy.contains(<number>purchase1Mock.quantity).click({ force: true })
      cy.wait('@getPurchase')
      cy.get('.RaEditButton-root').click()
      selectSupplierForced()
      selectMaterial('material')
      cy.get('[data-testid="input-quantity"] input')
        .clear()
        .type(String(<number>crupdatedData.quantity))
      selectJob('expense\\.job_id')
      cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
        .clear()
        .type('1520')
      cy.get('button[type="submit"]').click({ force: true })
    }
  }

  function navigateToDesktop(_menuIndex = 2) {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    expandMonetarySections()
    cy.get('[data-testid="menu-purchases"]').eq(_menuIndex).click()
    cy.wait('@getPurchases')
  }

  // menuIndex: 0=Stock(isMaterial), 1=Equipment(isEquipment), 2=Monetary(default)
  function showList(menuIndex = 2) {
    navigateToDesktop(menuIndex)
    cy.contains(<string>purchase1Mock.equipment?.name).should('be.visible')
    cy.contains(<string>purchase2Mock.equipment?.name).should('be.visible')
  }

  function showDetails(menuIndex = 2) {
    navigateToDesktop(menuIndex)
    cy.contains(<string>purchase1Mock.equipment?.name).click()
    cy.wait('@getPurchase')
    cy.contains(<number>purchase1Mock.quantity).should('exist')
    cy.contains(<number>purchase1Mock.expense?.amount).should('exist')
    cy.contains(<string>purchase1Mock.material?.name).should('exist')
    cy.contains(<string>purchase1Mock.equipment?.name).should('exist')
    cy.contains(<string>expense1Mock.job?.description).should('exist')
    cy.contains(<string>purchase1Mock.expense?.comment).should('exist')
  }

  function canCreateEquipment(menuIndex = 2) {
    navigateToDesktop(menuIndex)
    cy.intercept('POST', '**/purchase_operations', (req) => {
      req.reply(mockSuccessResponse({ id: 'new_purchase_id' }))
    }).as('createPurchaseOperation')
    creatOrUpdateEquipment(true)
    cy.wait('@createPurchaseOperation')
    cy.url().should('not.include', '/purchases/create')
  }

  function canCreateEquipmentForced(menuIndex = 2) {
    navigateToDesktop(menuIndex)
    cy.intercept('POST', '**/purchase_operations', (req) => {
      req.reply(mockSuccessResponse({ id: 'new_purchase_id' }))
    }).as('createPurchaseOperation')
    creatOrUpdateEquipmentForced(true)
    cy.wait('@createPurchaseOperation')
    cy.url().should('not.include', '/purchases/create')
  }

  function canCreateMaterial(menuIndex = 2) {
    navigateToDesktop(menuIndex)
    cy.intercept('POST', '**/purchase_operations', (req) => {
      req.reply(mockSuccessResponse({ id: 'new_purchase_id' }))
    }).as('createPurchaseOperation')
    creatOrUpdateMaterial(true)
    cy.wait('@createPurchaseOperation')
    cy.url().should('not.include', '/purchases/create')
  }

  function canCreateMaterialForced(menuIndex = 2) {
    navigateToDesktop(menuIndex)
    cy.intercept('POST', '**/purchase_operations', (req) => {
      req.reply(mockSuccessResponse({ id: 'new_purchase_id' }))
    }).as('createPurchaseOperation')
    creatOrUpdateMaterialForced(true)
    cy.wait('@createPurchaseOperation')
    cy.url().should('not.include', '/purchases/create')
  }

  function canUpdatePurchase(menuIndex = 2) {
    navigateToDesktop(menuIndex)
    cy.intercept('PUT', '**/purchases', (req) => {
      req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
    }).as('updatePurchase')
    creatOrUpdateMaterial(false)
    cy.wait('@updatePurchase')
    cy.url().should('include', '/purchases')
  }

  beforeEach(() => {
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  describe('default mode (Monetary menu)', () => {
    it('should display purchases list', () => showList(2))
    it('should show purchase details', () => showDetails(2))
    it('should create a new purchase equipment', () => canCreateEquipment(2))
    it('should create a new purchase material', () => canCreateMaterial(2))
    it('should update an existing purchase', () => canUpdatePurchase(2))

    it('should show error on create failure', () => {
      navigateToDesktop(2)
      cy.intercept(
        'POST',
        '**/purchase_operations',
        mockErrorResponse('BadRequestException', 'Invalid data', 400),
      ).as('createPurchaseFail')
      creatOrUpdateMaterial(true)
      cy.wait('@createPurchaseFail')
      cy.get('.RaNotification-error').should('be.visible')
    })

    it('should show error on update failure', () => {
      navigateToDesktop(2)
      cy.intercept(
        'PUT',
        '**/purchases',
        mockErrorResponse('BadRequestException', 'Update failed', 400),
      ).as('updatePurchaseFail')
      creatOrUpdateEquipment(false)
      cy.wait('@updatePurchaseFail')
      cy.get('.RaNotification-error').should('be.visible')
    })
  })

  describe('default mode on mobile (Monetary menu)', () => {
    it('should display purchases list on mobile', () => {
      cy.viewport(375, 667)
      cy.visit('/#/purchases')
      cy.wait('@getPurchases')
      cy.contains(<string>purchase1Mock.equipment?.name).should('be.visible')
      cy.contains(<string>purchase2Mock.equipment?.name).should('be.visible')
    })

    it('should show purchase details on mobile', () => {
      cy.viewport(375, 667)
      cy.visit('/#/purchases')
      cy.wait('@getPurchases')
      cy.contains(<string>purchase1Mock.equipment?.name).click({ force: true })
      cy.wait('@getPurchase')
      cy.contains(<number>purchase1Mock.quantity).should('exist')
      cy.contains(<number>purchase1Mock.expense?.amount).should('exist')
    })

    it('should create a new purchase equipment on mobile', () => {
      cy.viewport(375, 667)
      cy.visit('/#/purchases')
      cy.wait('@getPurchases')
      cy.intercept('POST', '**/purchase_operations', (req) => {
        req.reply(mockSuccessResponse({ id: 'new_purchase_id' }))
      }).as('createPurchase')
      creatOrUpdateEquipment(true)
      cy.wait('@createPurchase')
      cy.url().should('not.include', '/purchases/create')
    })

    it('should create a new purchase material on mobile', () => {
      cy.viewport(375, 667)
      cy.visit('/#/purchases')
      cy.wait('@getPurchases')
      cy.intercept('POST', '**/purchase_operations', (req) => {
        req.reply(mockSuccessResponse({ id: 'new_purchase_id' }))
      }).as('createPurchase')
      creatOrUpdateMaterial(true)
      cy.wait('@createPurchase')
      cy.url().should('not.include', '/purchases/create')
    })

    it('should update an existing purchase on mobile', () => {
      cy.viewport(375, 667)
      cy.visit('/#/purchases')
      cy.wait('@getPurchases')
      cy.intercept('PUT', '**/purchases', (req) => {
        req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
      }).as('updatePurchase')
      creatOrUpdateMaterial(false)
      cy.wait('@updatePurchase')
      cy.url().should('include', '/purchases')
    })
  })

  describe('equipment mode (Equipment menu - isEquipment=true)', () => {
    const menuIndex = 1

    it('should filter list for equipment only', () => {
      navigateToDesktop(menuIndex)
      cy.get('[data-testid="input-is_equipment"]').should('not.exist')
    })

    it('should create purchase with is_equipment forced true', () =>
      canCreateEquipmentForced(menuIndex))

    it('should update purchase with is_equipment forced true', () => {
      navigateToDesktop(menuIndex)
      cy.intercept('PUT', '**/purchases', (req) => {
        req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
      }).as('updatePurchase')
      creatOrUpdateEquipmentForced(false)
      cy.wait('@updatePurchase')
      cy.url().should('include', '/purchases')
    })
  })

  describe('material mode (Stock menu - isMaterial=true)', () => {
    const menuIndex = 0

    it('should filter list for materials only', () => {
      navigateToDesktop(menuIndex)
      cy.get('[data-testid="input-is_equipment"]').should('not.exist')
    })

    it('should create purchase with is_equipment forced false', () =>
      canCreateMaterialForced(menuIndex))

    it('should update purchase with is_equipment forced false', () => {
      navigateToDesktop(menuIndex)
      cy.intercept('PUT', '**/purchases', (req) => {
        req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
      }).as('updatePurchase')
      creatOrUpdateMaterialForced(false)
      cy.wait('@updatePurchase')
      cy.url().should('include', '/purchases')
    })
  })
})
