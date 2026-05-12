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
  selectCompany,
  selectEnumType,
} from '../support/utils.ts'

describe('E2E: Jobs', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateJobsMock[0]
    if (isCreating) {
      cy.contains('Create').click()
    } else {
      cy.contains(<string>job1Mock.description).click()
      cy.wait('@getJob')
      cy.get('.RaEditButton-root').click()
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
    cy.get('button[type="submit"]').click()
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
    cy.get('[data-testid="menu-jobs"]').click()
    cy.wait('@getJobs')
  })

  it('should display jobs list', () => {
    cy.contains(<string>job1Mock.description).should('be.visible')
    cy.contains(<string>job2Mock.description).should('be.visible')
  })

  it('should show job details', () => {
    cy.contains(<string>job1Mock.description).click()
    cy.wait('@getJob')
    cy.contains(<string>job1Mock.description).should('be.visible')
    cy.contains('En cours').should('be.visible')
  })

  it('should create a new job', () => {
    cy.intercept('PUT', '**/jobs', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateJobs(req.body)))
    }).as('createJob')
    creatOrUpdate(true)
    cy.wait('@createJob')
    cy.url().should('include', '/jobs')
  })

  it('should update an existing job', () => {
    cy.intercept('PUT', '**/jobs', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateJobs(req.body)))
    }).as('updateJob')
    creatOrUpdate(false)
    cy.wait('@updateJob')
    cy.url().should('include', '/jobs')
  })

  it('should show error on create failure', () => {
    cy.intercept(
      'PUT',
      '**/jobs',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createJobFail')
    creatOrUpdate(true)
    cy.wait('@createJobFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    cy.intercept(
      'PUT',
      '**/jobs',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateJobFail')
    creatOrUpdate(false)
    cy.wait('@updateJobFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
