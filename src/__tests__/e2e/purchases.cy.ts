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
      cy.get('[class*="RaCreateButton"]').click()
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
      cy.get('[class*="RaCreateButton"]').click()
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

  function creatOrUpdateEquipmentForced(isCreating: boolean) {
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
    } else {
      cy.contains(<string>purchase1Mock.equipment?.name).click()
      cy.wait('@getPurchase')
      cy.get('.RaEditButton-root').click()
    }
    selectWarehouse('supplier_id')
    selectEquipment('equipment')

    if (!isCreating) {
      selectJob('expense\\.job_id')
    }
    cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
      .clear()
      .type('10000')

    cy.get('button[type="submit"]').click()
  }

  function creatOrUpdateMaterialForced(isCreating: boolean) {
    const crupdatedData = crupdatePurchasesMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
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

  function navigateToDesktop(menuIndex = 2) {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-purchases"]').eq(menuIndex).click()
    cy.wait('@getPurchases')
  }

  function navigateToMobile(menuIndex = 2) {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-purchases"]').eq(menuIndex).scrollIntoView()
    cy.get('[data-testid="menu-purchases"]').eq(menuIndex).click({ force: true })
    cy.wait('@getPurchases')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
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
    cy.contains(<string>purchase1Mock.expense?.job_id).should('exist')
    cy.contains(<string>purchase1Mock.expense?.comment).should('exist')
  }

  function canCreateEquipment(menuIndex = 2) {
    navigateToDesktop(menuIndex)
    cy.intercept('PUT', '**/purchases', (req) => {
      req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
    }).as('createPurchase')
    creatOrUpdateEquipment(true)
    cy.wait(3000)
    cy.wait('@createPurchase')
    cy.url().should('include', '/purchases')
  }

  function canCreateEquipmentForced(menuIndex = 2) {
    navigateToDesktop(menuIndex)
    cy.intercept('PUT', '**/purchases', (req) => {
      req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
    }).as('createPurchase')
    creatOrUpdateEquipmentForced(true)
    cy.wait(3000)
    cy.wait('@createPurchase')
    cy.url().should('include', '/purchases')
  }

  function canCreateMaterial(menuIndex = 2) {
    navigateToDesktop(menuIndex)
    cy.intercept('PUT', '**/purchases', (req) => {
      req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
    }).as('createPurchase')
    creatOrUpdateMaterial(true)
    cy.wait(3000)
    cy.wait('@createPurchase')
    cy.url().should('include', '/purchases')
  }

  function canCreateMaterialForced(menuIndex = 2) {
    navigateToDesktop(menuIndex)
    cy.intercept('PUT', '**/purchases', (req) => {
      req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
    }).as('createPurchase')
    creatOrUpdateMaterialForced(true)
    cy.wait(3000)
    cy.wait('@createPurchase')
    cy.url().should('include', '/purchases')
  }

  function canUpdatePurchase(menuIndex = 2) {
    navigateToDesktop(menuIndex)
    cy.intercept('PUT', '**/purchases', (req) => {
      req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
    }).as('updatePurchase')
    creatOrUpdateMaterial(false)
    cy.wait(3000)
    cy.wait('@updatePurchase')
    cy.url().should('include', '/purchases')
  }

  function canUpdatePurchaseForced(menuIndex = 2) {
    navigateToDesktop(menuIndex)
    cy.intercept('PUT', '**/purchases', (req) => {
      req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
    }).as('updatePurchase')
    creatOrUpdateMaterialForced(false)
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

  describe('default mode (Monetary menu)', () => {
    it('should display purchases list', () => showList(2))
    it('should show purchase details', () => showDetails(2))
    it('should create a new purchase equipment', () => canCreateEquipment(2))
    it('should create a new purchase material', () => canCreateMaterial(2))
    it('should update an existing purchase', () => canUpdatePurchase(2))

    it('should show error on create failure', () => {
      navigateToDesktop(2)
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
      navigateToMobile(2)
      cy.contains(<string>purchase1Mock.equipment?.name).should('be.visible')
      cy.contains(<string>purchase2Mock.equipment?.name).should('be.visible')
    })

    it('should show purchase details on mobile', () => {
      navigateToMobile(2)
      cy.contains(<string>purchase1Mock.equipment?.name).click()
      cy.wait('@getPurchase')
      cy.contains(<number>purchase1Mock.quantity).should('exist')
      cy.contains(<number>purchase1Mock.expense?.amount).should('exist')
    })

    it('should create a new purchase equipment on mobile', () => {
      navigateToMobile(2)
      cy.intercept('PUT', '**/purchases', (req) => {
        req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
      }).as('createPurchase')
      creatOrUpdateEquipment(true)
      cy.wait(3000)
      cy.wait('@createPurchase')
      cy.url().should('include', '/purchases')
    })

    it('should create a new purchase material on mobile', () => {
      navigateToMobile(2)
      cy.intercept('PUT', '**/purchases', (req) => {
        req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
      }).as('createPurchase')
      creatOrUpdateMaterial(true)
      cy.wait(3000)
      cy.wait('@createPurchase')
      cy.url().should('include', '/purchases')
    })

    it('should update an existing purchase on mobile', () => {
      navigateToMobile(2)
      cy.intercept('PUT', '**/purchases', (req) => {
        req.reply(mockSuccessResponse(createOrUpdatePurchases(req.body)))
      }).as('updatePurchase')
      creatOrUpdateMaterial(false)
      cy.wait(3000)
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
      cy.wait(3000)
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
      cy.wait(3000)
      cy.wait('@updatePurchase')
      cy.url().should('include', '/purchases')
    })
  })
})
