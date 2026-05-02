import {
  mockSuccessResponse,
  mockErrorResponse,
  loginRequestMock,
  authResponseMock,
  whoamiResponseMock,
} from '../mocks/responses/auth-api'
import { companiesMock, company1Mock } from '../mocks/responses/companies-api'
import {
  warehouse1Mock,
  warehouse2Mock,
  warehousesMock,
  crupdateWarehousesMock,
  createOrUpdateWarehouses,
} from '../mocks/responses/warehouses-api'
import { expense2Mock, job1Mock, job2Mock, jobsMock } from '../mocks/responses'

describe('E2E: Warehouses', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    // Définir currentCompanyId pour les ressources dynamiques
    cy.window().then((win) => {
      win.localStorage.setItem('currentCompanyId', 'comp1_id')
    })
    cy.intercept('POST', '**/auth/login', mockSuccessResponse(authResponseMock)).as('login')
    cy.intercept('GET', '**/auth/whoami', mockSuccessResponse(whoamiResponseMock)).as('whoami')

    cy.intercept('GET', '/companies/comp1_id/warehouses*', mockSuccessResponse(warehousesMock)).as(
      'getWarehouses',
    )
    cy.intercept(
      'GET',
      '/companies/comp1_id/warehouses/wh1_id*',
      mockSuccessResponse(warehouse1Mock),
    ).as('getWarehouse')

    cy.intercept('GET', '/companies/comp1_id/jobs*', mockSuccessResponse(jobsMock)).as('getJobs')
    cy.intercept('GET', '/companies/comp1_id/jobs/job1_id*', mockSuccessResponse(job1Mock)).as(
      'getJob',
    )
    cy.intercept('GET', '/companies*', mockSuccessResponse(companiesMock)).as('getCompanies')
    cy.intercept('GET', '/companies/comp1_id', mockSuccessResponse(company1Mock)).as('getCompany')

    // Intercepter les endpoints pour les sélecteurs
    cy.intercept('GET', '**/companies/*/jobs', mockSuccessResponse([job2Mock])).as(
      'getJobsSelection',
    )
    cy.intercept('GET', '**/companies/*/jobs/*/users', mockSuccessResponse([job1Mock])).as(
      'getJobUsersSelection',
    )
    cy.intercept('GET', '**/expenses', mockSuccessResponse([expense2Mock])).as(
      'getExpensesSelection',
    )

    cy.visit('/', { failOnStatusCode: false })
    cy.get('input[name="username"]').type(<string>loginRequestMock.email)
    cy.get('input[name="password"]').type(<string>loginRequestMock.password)
    cy.get('button[type="submit"]').click()
    cy.wait(['@login', '@whoami'])
    cy.url().should('not.include', '/login')
  })

  it('should display warehouses list', () => {
    cy.get('[data-testid="menu-warehouses"]').click()
    cy.wait('@getWarehouses')
    cy.contains(<string>warehouse1Mock.name).should('be.visible')
    cy.contains(<string>warehouse2Mock.name).should('be.visible')
  })

  it('should show warehouse details', () => {
    cy.get('[data-testid="menu-warehouses"]').click()
    cy.wait('@getWarehouses')
    cy.contains(<string>warehouse1Mock.name).click()
    cy.wait('@getWarehouse')
    cy.contains(<string>warehouse1Mock.name).should('be.visible')
    cy.contains(<string>warehouse1Mock.description).should('be.visible')
  })

  it('should create a new warehouse', () => {
    const newWarehouse = crupdateWarehousesMock[1]

    cy.intercept('PUT', '/companies/comp1_id/warehouses', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateWarehouses(req.body)))
    }).as('createWarehouse')

    cy.get('[data-testid="menu-warehouses"]').click()
    cy.wait('@getWarehouses')
    cy.contains('Create').click()

    cy.get('[data-testid="input-name"] input').type(<string>newWarehouse.name)
    cy.get('[data-testid="input-description"] textarea:visible').type(
      <string>newWarehouse.description,
    )
    // Pour ReferenceSelectWithCreate, on clique et on sélectionne par la description du job
    cy.get('[data-testid="input-jobs-id"]').click()
    cy.wait('@getJobsSelection')
    cy.get('#menu-job_id')
      .contains(<string>job1Mock.description)
      .click({ force: true })
    cy.get('button[type="submit"]').click()

    cy.wait('@createWarehouse')
    cy.url().should('include', '/warehouses')
  })

  it('should update an existing warehouse', () => {
    const updatedData = crupdateWarehousesMock[0]

    cy.intercept('PUT', '/companies/comp1_id/warehouses', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateWarehouses(req.body)))
    }).as('updateWarehouse')

    cy.get('[data-testid="menu-warehouses"]').click()
    cy.wait('@getWarehouses')
    cy.contains(<string>warehouse1Mock.name).click()
    cy.wait('@getWarehouse')
    cy.contains('Edit').click()

    cy.get('[data-testid="input-name"] input')
      .clear()
      .type(<string>updatedData.name)
    cy.get('[data-testid="input-description"] textarea:visible')
      .clear()
      .type(<string>updatedData.description, { force: true })
    cy.get('button[type="submit"]').click()

    cy.wait('@updateWarehouse')
    cy.url().should('include', '/warehouses')
  })

  it('should show error on create failure', () => {
    cy.intercept(
      'PUT',
      '/companies/comp1_id/warehouses',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createWarehouseFail')

    cy.get('[data-testid="menu-warehouses"]').click()
    cy.wait('@getWarehouses')
    cy.contains('Create').click()

    cy.get('[data-testid="input-name"] input').type('Test Warehouse')
    cy.get('[data-testid="input-description"] textarea:visible').type('Test Description')
    // Pour ReferenceSelectWithCreate
    cy.get('[data-testid="input-jobs-id"]').click()
    cy.wait('@getJobsSelection')
    cy.get('#menu-job_id')
      .contains(<string>job1Mock.description)
      .click({ force: true })
    cy.get('button[type="submit"]').click()
    cy.wait('@createWarehouseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    cy.intercept(
      'PUT',
      '/companies/comp1_id/warehouses',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateWarehouseFail')

    cy.get('[data-testid="menu-warehouses"]').click()
    cy.wait('@getWarehouses')
    cy.contains(<string>warehouse1Mock.name).click()
    cy.wait('@getWarehouse')
    cy.contains('Edit').click()

    cy.get('[data-testid="input-name"] input')
      .clear()
      .type('Updated Warehouse Name', { force: true })
    cy.get('button[type="submit"]').click()

    cy.wait('@updateWarehouseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
