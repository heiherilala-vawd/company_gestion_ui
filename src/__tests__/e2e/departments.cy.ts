import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  department1Mock,
  department2Mock,
  departmentsMock,
  createOrUpdateDepartments,
  crupdateDepartmentsMock,
} from '../mocks/responses/departments-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Departments', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateDepartmentsMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
    } else {
      cy.get('[class*="RaDatagrid"]')
        .contains(<string>department1Mock.name)
        .click()
      cy.wait('@getDepartment')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-name"] input')
      .clear()
      .type(<string>crupdatedData.name)
    cy.get('[data-testid="input-description"] textarea:visible')
      .clear()
      .type(<string>crupdatedData.description, { force: true })
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.window().then((win) => {
      win.location.hash = '#/departments'
    })
    cy.wait('@getDepartments')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.window().then((win) => {
      win.location.hash = '#/departments'
    })
    cy.wait('@getDepartments')
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.get('[class*="RaDatagrid"]')
      .contains(<string>department1Mock.name)
      .should('be.visible')
    cy.get('[class*="RaDatagrid"]')
      .contains(<string>department2Mock.name)
      .should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.get('[class*="RaDatagrid"]')
      .contains(<string>department1Mock.name)
      .click()
    cy.wait('@getDepartment')
    cy.contains(<string>department1Mock.name).should('be.visible')
    cy.contains(<string>department1Mock.description).should('be.visible')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/companies/*/departments*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateDepartments(req.body)))
    }).as('createDepartment')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createDepartment')
    cy.url().should('include', '/departments')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/companies/*/departments*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateDepartments(req.body)))
    }).as('updateDepartment')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateDepartment')
    cy.url().should('include', '/departments')
  }

  beforeEach(() => {
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/departments*', mockSuccessResponse(departmentsMock)).as(
      'getDepartments',
    )
    cy.intercept('GET', '**/departments/dept1_id', mockSuccessResponse(department1Mock)).as(
      'getDepartment',
    )
    cy.intercept('GET', '**/departments/newId', mockSuccessResponse(department1Mock)).as(
      'getDepartmentCreate',
    )
    loginInPage()
    insertInToLocalStorage()
  })

  it('should display departments list', () => showList(true))
  it('should show department details', () => showDetails(true))
  it('should create a new department', () => canCreate(true))
  it('should update an existing department', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/companies/*/departments*',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createDepartmentFail')
    creatOrUpdate(true)
    cy.wait('@createDepartmentFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/companies/*/departments*',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateDepartmentFail')
    creatOrUpdate(false)
    cy.wait('@updateDepartmentFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display departments list on mobile', () => showList(false))
  it('should show department details on mobile', () => showDetails(false))
  it('should create a new department on mobile', () => canCreate(false))
  it('should update an existing department on mobile', () => canUpdate(false))
})
