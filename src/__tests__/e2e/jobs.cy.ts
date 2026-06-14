import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  job1Mock,
  job2Mock,
  crupdateJobsMock,
  createOrUpdateJobs,
} from '../mocks/responses/jobs-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectEnumType,
} from '../support/utils.ts'

describe('E2E: Jobs', () => {
  function creatOrUpdate(isCreating: boolean, isComputerView: boolean = true) {
    const crupdatedData = crupdateJobsMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
    } else {
      if (isComputerView) {
        cy.contains('td', <string>job1Mock.description).click({ force: true })
      } else {
        cy.contains(<string>job1Mock.description)
          .first()
          .click({ force: true })
      }
      cy.wait('@getJob', { timeout: 15000 })
      cy.get('.RaEditButton-root').click({ force: true })
    }
    cy.get('[data-testid="input-description"] textarea:visible')
      .clear()
      .type(<string>crupdatedData.description, { force: true })
    cy.get('[data-testid="input-contract-signature-date"] [type="datetime-local"]')
      .clear()
      .type('2022-01-10T00:00')
    cy.get('[data-testid="input-start-date"] [type="datetime-local"]')
      .clear()
      .type('2022-02-01T00:00')
    cy.get('[data-testid="input-end-date"] [type="datetime-local"]')
      .clear()
      .type('2022-12-31T00:00')
    selectEnumType('input-status', 'En cours')
    cy.get('button[type="submit"]').click({ force: true })
  }

  function setUpViewport(isComputerView: boolean) {
    if (!isComputerView) {
      cy.viewport(375, 667)
    }
  }

  function showList(isComputerView: boolean) {
    setUpViewport(isComputerView)
    cy.contains(<string>job1Mock.description).should('be.visible')
    cy.contains(<string>job2Mock.description).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    setUpViewport(isComputerView)
    if (isComputerView) {
      cy.contains('td', <string>job1Mock.description).click({ force: true })
    } else {
      cy.contains(<string>job1Mock.description)
        .first()
        .click({ force: true })
    }
    cy.wait('@getJob', { timeout: 15000 })
    cy.contains(<string>job1Mock.description).should('be.visible')
    cy.contains('En cours').should('be.visible')
  }

  function canCreate(isComputerView: boolean) {
    setUpViewport(isComputerView)
    cy.intercept('PUT', '**/jobs', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateJobs(req.body)))
    }).as('createJob')
    creatOrUpdate(true, isComputerView)
    cy.wait('@createJob')
    cy.url().should('include', '/jobs')
  }

  function canUpdate(isComputerView: boolean) {
    setUpViewport(isComputerView)
    cy.intercept('PUT', '**/jobs', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateJobs(req.body)))
    }).as('updateJob')
    creatOrUpdate(false, isComputerView)
    cy.wait('@updateJob')
    cy.url().should('include', '/jobs')
  }

  beforeEach(() => {
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
    // loginInPage redirects to /jobs via WelcomePage token check before
    // currentCompanyId is set. Re-navigate so JobList reads the correct value.
    cy.visit('/jobs', { failOnStatusCode: false })
    cy.wait('@getJobs', { timeout: 15000 })
  })

  it('should display jobs list', () => showList(true))
  it('should show job details', () => showDetails(true))
  it('should create a new job', () => canCreate(true))
  it('should update an existing job', () => canUpdate(true))

  it('should show error on create failure', () => {
    cy.intercept(
      'PUT',
      '**/jobs',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createJobFail')
    creatOrUpdate(true, true)
    cy.wait('@createJobFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    cy.intercept(
      'PUT',
      '**/jobs',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateJobFail')
    creatOrUpdate(false, true)
    cy.wait('@updateJobFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display jobs list on mobile', () => showList(false))
  it('should show job details on mobile', () => showDetails(false))
  it('should create a new job on mobile', () => canCreate(false))
  it('should update an existing job on mobile', () => canUpdate(false))
})
