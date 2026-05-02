import {
  mockSuccessResponse,
  mockErrorResponse,
  loginRequestMock,
  authResponseMock,
  whoamiResponseMock,
} from '../mocks/responses/auth-api'
import { companiesMock, company1Mock, company2Mock } from '../mocks/responses/companies-api'
import {
  job1Mock,
  job2Mock,
  jobsMock,
  crupdateJobsMock,
  createOrUpdateJobs,
  job3Mock,
} from '../mocks/responses/jobs-api'
import { expense2Mock, user3Mock } from '../mocks/responses'

describe('E2E: Jobs', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    // Définir currentCompanyId pour les ressources dynamiques
    cy.window().then((win) => {
      win.localStorage.setItem('currentCompanyId', 'comp1_id')
    })
    cy.intercept('POST', '**/auth/login', mockSuccessResponse(authResponseMock)).as('login')
    cy.intercept('GET', '**/auth/whoami', mockSuccessResponse(whoamiResponseMock)).as('whoami')
    cy.intercept('GET', '/companies/comp1_id/jobs*', mockSuccessResponse(jobsMock)).as('getJobs')
    cy.intercept('GET', '/companies/comp1_id/jobs/job1_id*', mockSuccessResponse(job1Mock)).as(
      'getJob',
    )
    cy.intercept('GET', '/companies*', mockSuccessResponse(companiesMock)).as('getCompanies')
    cy.intercept('GET', '/companies/comp1_id', mockSuccessResponse(company1Mock)).as('getCompany')

    // Intercepter les endpoints pour les sélecteurs
    cy.intercept('GET', '**/companies', mockSuccessResponse([company2Mock])).as(
      'getCompaniesSelection',
    )
    cy.intercept('GET', '**/companies/*/jobs', mockSuccessResponse([job3Mock])).as(
      'getJobsSelection',
    )
    cy.intercept('GET', '**/companies/*/jobs/*/users', mockSuccessResponse([user3Mock])).as(
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

  it('should display jobs list', () => {
    cy.get('[data-testid="menu-jobs"]').click()
    cy.wait('@getJobs')
    cy.contains(<string>job1Mock.description).should('be.visible')
    cy.contains(<string>job2Mock.description).should('be.visible')
  })

  it('should show job details', () => {
    cy.get('[data-testid="menu-jobs"]').click()
    cy.wait('@getJobs')
    cy.contains(<string>job1Mock.description).click()
    cy.wait('@getJob')
    cy.contains(<string>job1Mock.description).should('be.visible')
    cy.contains('En cours').should('be.visible')
  })

  it('should create a new job', () => {
    const newJob = crupdateJobsMock[1]

    cy.intercept('PUT', '/companies/comp1_id/jobs', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateJobs(req.body)))
    }).as('createJob')

    cy.get('[data-testid="menu-jobs"]').click()
    cy.wait('@getJobs')
    cy.contains('Create').click()

    cy.get('[data-testid="input-description"] textarea:visible').type(<string>newJob.description)
    // Pour ReferenceSelectWithCreate, on clique et on sélectionne par le nom
    cy.get('[data-testid="input-companies-id"]').click()
    cy.wait('@getCompanies')
    cy.contains(<string>company1Mock.name).click({ force: true })
    cy.wait('@getCompany')
    cy.get('[data-testid="input-status"]').click()
    cy.contains('En cours').click({ force: true })
    cy.get('button[type="submit"]').click()

    cy.wait('@createJob')
    cy.url().should('include', '/jobs')
  })

  it('should update an existing job', () => {
    const updatedData = crupdateJobsMock[0]

    cy.intercept('PUT', '/companies/comp1_id/jobs', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateJobs(req.body)))
    }).as('updateJob')

    cy.get('[data-testid="menu-jobs"]').click()
    cy.wait('@getJobs')
    cy.contains(<string>job1Mock.description).click()
    cy.wait('@getJob')
    cy.contains('Edit').click()

    cy.get('[data-testid="input-description"] textarea:visible')
      .clear()
      .type(<string>updatedData.description, { force: true })
    cy.get('button[type="submit"]').click()

    cy.wait('@updateJob')
    cy.url().should('include', '/jobs')
  })

  it('should show error on create failure', () => {
    cy.intercept(
      'PUT',
      '/companies/comp1_id/jobs',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createJobFail')

    cy.get('[data-testid="menu-jobs"]').click()
    cy.wait('@getJobs')
    cy.contains('Create').click()

    cy.get('[data-testid="input-description"] textarea:visible').type('Test Job Description')
    // Pour ReferenceSelectWithCreate, on clique et on sélectionne par le nom
    cy.get('[data-testid="input-companies-id"]').click()
    cy.wait('@getCompanies')
    cy.contains(<string>company1Mock.name).click({ force: true })
    cy.wait('@getCompany')
    cy.get('[data-testid="input-status"]').click()
    cy.contains('En cours').click({ force: true })
    cy.get('button[type="submit"]').click()
    cy.wait('@createJobFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    cy.intercept(
      'PUT',
      '/companies/comp1_id/jobs',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateJobFail')

    cy.get('[data-testid="menu-jobs"]').click()
    cy.wait('@getJobs')
    cy.contains(<string>job1Mock.description).click()
    cy.wait('@getJob')
    cy.contains('Edit').click()

    cy.get('[data-testid="input-description"] textarea:visible')
      .clear()
      .type('Updated Job Description', { force: true })
    // Pour ReferenceSelectWithCreate, on clique et on sélectionne par le nom
    cy.get('[data-testid="input-companies-id"]').click()
    cy.wait('@getCompanies')
    cy.contains(<string>company1Mock.name).click({ force: true })
    cy.wait('@getCompany')
    cy.get('button[type="submit"]').click()
    cy.wait('@updateJobFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
