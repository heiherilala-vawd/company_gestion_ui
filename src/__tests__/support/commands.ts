// Custom Cypress commands

// Commande pour simuler une connexion réussie
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.intercept('POST', '**/auth/login', {
    statusCode: 200,
    body: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      type: 'Bearer',
      id: 'user1_id',
      email: email,
      role: 'ADMIN',
    },
  }).as('loginRequest')

  cy.get('[data-testid="email-input"]').type(email)
  cy.get('[data-testid="password-input"]').type(password)
  cy.get('[data-testid="login-button"]').click()
  cy.wait('@loginRequest')
})

// Commande pour vérifier qu'on est sur la page login
Cypress.Commands.add('shouldBeOnLoginPage', () => {
  cy.url().should('include', '/login')
  cy.get('[data-testid="login-form"]').should('be.visible')
})

// Commande pour vérifier qu'on est sur la page d'accueil (après login)
Cypress.Commands.add('shouldBeOnHomePage', () => {
  cy.url().should('not.include', '/login')
  cy.get('[data-testid="app-layout"]').should('be.visible')
})
