import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  maintenance1Mock,
  maintenance2Mock,
  maintenancesMock,
  crupdateMaintenancesMock,
  createOrUpdateMaintenances,
} from '../mocks/responses/maintenances-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectReferenceWithCreate,
} from '../support/utils.ts'
import { equipment1Mock } from '../mocks/responses/equipment-api'

describe('E2E: Maintenances', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateMaintenancesMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
      cy.get('[data-testid="input-id"] input').then(($input) => {
        $input.val('newId')
        $input.trigger('change')
      })
    } else {
      cy.contains(<string>maintenance1Mock.description).click()
      cy.wait('@getMaintenance')
      cy.get('.RaEditButton-root').click()
    }
    selectReferenceWithCreate('input-equipment_id', 'equipment_id', <string>equipment1Mock.name)
    cy.get('[data-testid="input-description"] textarea:visible')
      .first()
      .clear()
      .type(<string>crupdatedData.description, { force: true })
    cy.get('[data-testid="input-expense.amount"] input')
      .clear()
      .type(<string>(<unknown>crupdatedData.expense.amount))
    cy.get('[data-testid="input-expense.comment"] input')
      .clear()
      .type(<string>crupdatedData.expense.comment)
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-maintenances"]').click()
    cy.wait('@getMaintenances')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.wait(1000)
    cy.get('[class*="RaSidebarToggleButton"]').first().click({ force: true })
    cy.wait(1000)
    cy.get('[data-testid="menu-item-home"]', { timeout: 10000 }).should('exist')
    cy.get('[data-testid="menu-maintenances"]').scrollIntoView()
    cy.get('[data-testid="menu-maintenances"]').click({ force: true })
    cy.wait('@getMaintenances')
    cy.get('[class*="RaSidebarToggleButton"]').first().click({ force: true })
    cy.wait(500)
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>maintenance1Mock.description).should('be.visible')
    cy.contains(<string>maintenance2Mock.description).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>maintenance1Mock.description).click()
    cy.wait('@getMaintenance')
    cy.contains(<string>maintenance1Mock.description).should('exist')
    cy.contains(<string>maintenance1Mock.equipment_id).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/maintenances*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateMaintenances(req.body)))
    }).as('createMaintenance')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createMaintenance')
    cy.url().should('include', '/maintenances')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/maintenances*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateMaintenances(req.body)))
    }).as('updateMaintenance')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateMaintenance')
    cy.url().should('include', '/maintenances')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/maintenances*', mockSuccessResponse(maintenancesMock)).as(
      'getMaintenances',
    )
    cy.intercept('GET', '**/maintenances/maint1_id', mockSuccessResponse(maintenance1Mock)).as(
      'getMaintenance',
    )
    cy.intercept('GET', '**/maintenances/newId', mockSuccessResponse(maintenance1Mock)).as(
      'getMaintenanceCreate',
    )
    loginInPage()
    insertInToLocalStorage()
  })

  it('should display maintenances list', () => showList(true))
  it('should show maintenance details', () => showDetails(true))
  it('should create a new maintenance', () => canCreate(true))
  it('should update an existing maintenance', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/maintenances*',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createMaintenanceFail')
    creatOrUpdate(true)
    cy.wait('@createMaintenanceFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/maintenances*',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateMaintenanceFail')
    creatOrUpdate(false)
    cy.wait('@updateMaintenanceFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display maintenances list on mobile', () => showList(false))
  it('should show maintenance details on mobile', () => showDetails(false))
  it('should create a new maintenance on mobile', () => canCreate(false))
  it('should update an existing maintenance on mobile', () => canUpdate(false))
})
