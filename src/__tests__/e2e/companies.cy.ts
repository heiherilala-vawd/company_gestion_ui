import {
  mockSuccessResponse,
  mockErrorResponse,
  loginRequestMock,
  authResponseMock,
  whoamiResponseMock,
} from '../mocks/responses/auth-api'
import {
  company1Mock,
  company2Mock,
  companiesMock,
  crupdateCompaniesMock,
  createOrUpdateCompanies,
} from '../mocks/responses/companies-api'
import { expense2Mock, job3Mock, user3Mock } from '../mocks/responses'

describe('E2E: Companies', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.intercept('POST', '**/auth/login', mockSuccessResponse(authResponseMock)).as('login')
    cy.intercept('GET', '**/auth/whoami', mockSuccessResponse(whoamiResponseMock)).as('whoami')
    cy.intercept('GET', '/companies*', mockSuccessResponse(companiesMock)).as('getCompanies')
    cy.intercept('GET', '/companies/comp1_id*', mockSuccessResponse(company1Mock)).as('getCompany')

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

  it('should display companies list', () => {
    cy.get('[data-testid="menu-companies"]').click()
    cy.wait('@getCompanies')
    cy.contains(<string>company1Mock.name).should('be.visible')
    cy.contains(<string>company2Mock.name).should('be.visible')
  })

  it('should show company details', () => {
    cy.get('[data-testid="menu-companies"]').click()
    cy.wait('@getCompanies')
    cy.contains(<string>company1Mock.name).click()
    cy.wait('@getCompany')
    cy.contains(<string>company1Mock.name).should('exist')
    cy.contains(<string>company1Mock.rib).should('exist')
    cy.contains(<string>company1Mock.description).should('exist')
  })

  it('should create a new company', () => {
    const newCompany = crupdateCompaniesMock[1]

    cy.intercept('PUT', '/companies', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateCompanies(req.body)))
    }).as('createCompany')

    cy.get('[data-testid="menu-companies"]').click()
    cy.wait('@getCompanies')
    cy.contains('Create').click()

    cy.get('[data-testid="input-name"] input').type(<string>newCompany.name)
    cy.get('[data-testid="input-rib"] input').type(<string>newCompany.rib)
    cy.get('[data-testid="input-description"] textarea:visible')
      .first()
      .type(<string>newCompany.description)
    cy.get('[data-testid="input-comment"] input').type(<string>newCompany.comment)
    cy.get('[data-testid="input-company-type"]').click()
    cy.contains(<string>newCompany.company_type).click()
    cy.get('button[type="submit"]').click()

    cy.wait('@createCompany')
    cy.url().should('include', '/companies')
  })

  it('should update an existing company', () => {
    const updatedData = crupdateCompaniesMock[0]

    cy.intercept('PUT', '/companies', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateCompanies(req.body)))
    }).as('updateCompany')

    cy.get('[data-testid="menu-companies"]').click()
    cy.wait('@getCompanies')
    cy.contains(<string>company1Mock.name).click()
    cy.wait('@getCompany')
    cy.contains('Edit').click()

    cy.get('[data-testid="input-name"] input')
      .clear()
      .type(<string>updatedData.name)
    cy.get('[data-testid="input-description"] textarea:visible')
      .first()
      .clear()
      .type(<string>updatedData.description, { force: true })
    cy.get('[data-testid="input-comment"] input')
      .clear()
      .type(<string>updatedData.comment)
    cy.get('button[type="submit"]').click()

    cy.wait('@updateCompany')
    cy.url().should('include', '/companies')
  })

  it('should show error on create failure', () => {
    cy.intercept(
      'PUT',
      '/companies',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createCompanyFail')

    cy.get('[data-testid="menu-companies"]').click()
    cy.wait('@getCompanies')
    cy.contains('Create').click()

    cy.get('[data-testid="input-name"] input').type('Test Company')
    cy.get('[data-testid="input-company-type"]').click()
    cy.contains('BTP').click()
    cy.get('button[type="submit"]').click()
    cy.wait('@createCompanyFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    cy.intercept('PUT', '/companies', (req) => {
      req.reply(mockErrorResponse('BadRequestException', 'Update failed', 400))
    }).as('updateCompanyFail')

    cy.get('[data-testid="menu-companies"]').click()
    cy.wait('@getCompanies')
    cy.contains(<string>company1Mock.name).click()
    cy.wait('@getCompany')
    cy.contains('Edit').click()

    // Attendre que le formulaire soit chargé
    cy.get('[data-testid="input-name"] input').should('be.visible')

    // Modifier le nom (comme dans le test de mise à jour qui passe)
    cy.get('[data-testid="input-name"] input').clear().type('Updated Name')

    // Remplir aussi les autres champs pour s'assurer que le formulaire est valide
    cy.get('[data-testid="input-description"] textarea:visible')
      .first()
      .clear()
      .type('Updated description', { force: true })
    cy.get('[data-testid="input-comment"] input').clear().type('Updated comment')

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click()

    // Attendre l'interception de la requête PUT
    cy.wait('@updateCompanyFail')

    // Vérifier que la notification d'erreur s'affiche
    cy.get('.RaNotification-error').should('be.visible')
  })
})
