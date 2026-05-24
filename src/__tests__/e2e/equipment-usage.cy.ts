import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  equipmentUsage1Mock,
  equipmentUsage2Mock,
  equipmentUsagesMock,
  crupdateEquipmentUsagesMock,
  createOrUpdateEquipmentUsages,
} from '../mocks/responses/equipment-usage-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectReferenceWithCreate,
} from '../support/utils.ts'
import { equipment1Mock } from '../mocks/responses/equipment-api'
import { job1Mock } from '../mocks/responses/jobs-api'

describe('E2E: Equipment Usage', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateEquipmentUsagesMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
      cy.get('[data-testid="input-id"] input').then(($input) => {
        $input.val('newId')
        $input.trigger('change')
      })
    } else {
      cy.contains(String(equipmentUsage1Mock.equipment_id)).click()
      cy.wait('@getEquipmentUsage')
      cy.get('.RaEditButton-root').click()
    }
    selectReferenceWithCreate('input-equipment_id', 'equipment_id', <string>equipment1Mock.name)
    selectReferenceWithCreate('input-job_id', 'job_id', <string>job1Mock.description)
    cy.get('[data-testid="input-start_time"] input')
      .clear()
      .type(<string>crupdatedData.start_time)
    cy.get('[data-testid="input-end_time"] input')
      .clear()
      .type(<string>crupdatedData.end_time)
    cy.get('button[type="submit"]').click()
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-equipment-usage"]').click()
    cy.wait('@getEquipmentUsages')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-equipment-usage"]').scrollIntoView()
    cy.get('[data-testid="menu-equipment-usage"]').click({ force: true })
    cy.wait('@getEquipmentUsages')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(String(equipmentUsage1Mock.equipment_id)).should('be.visible')
    cy.contains(String(equipmentUsage2Mock.equipment_id)).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(String(equipmentUsage1Mock.equipment_id)).click()
    cy.wait('@getEquipmentUsage')
    cy.contains(String(equipmentUsage1Mock.equipment_id)).should('exist')
    cy.contains(String(equipmentUsage1Mock.start_time)).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/equipment_usage', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateEquipmentUsages(req.body)))
    }).as('createEquipmentUsage')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createEquipmentUsage')
    cy.url().should('include', '/equipment_usage')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/equipment_usage', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateEquipmentUsages(req.body)))
    }).as('updateEquipmentUsage')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateEquipmentUsage')
    cy.url().should('include', '/equipment_usage')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/equipment_usage*', mockSuccessResponse(equipmentUsagesMock)).as(
      'getEquipmentUsages',
    )
    cy.intercept('GET', '**/equipment_usage/eu1_id', mockSuccessResponse(equipmentUsage1Mock)).as(
      'getEquipmentUsage',
    )
    cy.intercept('GET', '**/equipment_usage/newId', mockSuccessResponse(equipmentUsage1Mock)).as(
      'getEquipmentUsageCreate',
    )
    loginInPage()
  })

  it('should display equipment usage list', () => showList(true))
  it('should show equipment usage details', () => showDetails(true))
  it('should create a new equipment usage', () => canCreate(true))
  it('should update an existing equipment usage', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/equipment_usage',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createEquipmentUsageFail')
    creatOrUpdate(true)
    cy.wait('@createEquipmentUsageFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/equipment_usage',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateEquipmentUsageFail')
    creatOrUpdate(false)
    cy.wait('@updateEquipmentUsageFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display equipment usage list on mobile', () => showList(false))
  it('should show equipment usage details on mobile', () => showDetails(false))
  it('should create a new equipment usage on mobile', () => canCreate(false))
  it('should update an existing equipment usage on mobile', () => canUpdate(false))
})
