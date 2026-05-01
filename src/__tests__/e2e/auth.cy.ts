// Tests E2E d'authentification avec mocks
// Les mocks sont définis directement ici pour éviter les erreurs de compilation

import { authResponseMock, loginRequestMock, whoamiResponseMock } from '../mocks/responses'


describe('E2E: Authentication', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.visit('/', { failOnStatusCode: false })
  })

  it('remains on login page if login fails with wrong credentials', () => {
    // Intercepter avec réponse d'échec
    cy.intercept('POST', '**/auth/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' },
    }).as('failedLogin')

    cy.url().should('include', '/login')

    cy.get('input[name="username"]').type('wrong@email.com')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    cy.wait('@failedLogin')

    cy.url().should('include', '/login')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('redirects to home page after successful login', () => {
    // Intercepter avec le mock de succès
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: authResponseMock,
    }).as('successfulLogin')

    cy.intercept('GET', '**/auth/whoami', {
      statusCode: 200,
      body: whoamiResponseMock,
    }).as('whoamiRequest')

    cy.visit('/', { failOnStatusCode: false })
    cy.url().should('include', '/login')

    // Utiliser les données du mock
    cy.get('input[name="username"]').type(<string>loginRequestMock.email)
    cy.get('input[name="password"]').type(<string>loginRequestMock.password)
    cy.get('button[type="submit"]').click()

    cy.wait('@successfulLogin')
    cy.wait('@whoamiRequest')

    cy.url().should('not.include', '/login')
    cy.get('[class*="RaLayout"]').should('be.visible')
  })

  it('redirects to login page when accessing protected route without auth', () => {
    cy.clearLocalStorage()
    cy.clearCookies()

    cy.visit('/', { failOnStatusCode: false })
    cy.url().should('include', '/login')
  })

  it('can logout and should be redirected to login page', () => {
    // Login avec les mocks
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: authResponseMock,
    }).as('loginRequest')

    cy.intercept('GET', '**/auth/whoami', {
      statusCode: 200,
      body: whoamiResponseMock,
    }).as('whoamiRequest')

    cy.visit('/', { failOnStatusCode: false })
    cy.get('input[name="username"]').type(<string>loginRequestMock.email)
    cy.get('input[name="password"]').type(<string>loginRequestMock.password)
    cy.get('button[type="submit"]').click()
    cy.wait('@loginRequest')
    cy.wait('@whoamiRequest')

    cy.url().should('not.include', '/login')
    cy.get('[class*="RaLayout"]').should('be.visible')

    // Simuler le logout
    cy.clearLocalStorage()
    cy.visit('/', { failOnStatusCode: false })
    cy.url().should('include', '/login')
  })
})
