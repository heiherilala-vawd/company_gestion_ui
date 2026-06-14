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

  cy.contains('button', 'Se connecter').click()
  cy.get('#wp-email').type(email)
  cy.get('#wp-password').type(password)
  cy.get('.wp-modal__submit').click()
  cy.wait('@loginRequest')
})

// Commande pour vérifier qu'on est sur la page login
Cypress.Commands.add('shouldBeOnLoginPage', () => {
  cy.contains('button', 'Se connecter', { timeout: 10000 }).should('be.visible')
})

// Commande pour vérifier qu'on est sur la page d'accueil (après login)
Cypress.Commands.add('shouldBeOnHomePage', () => {
  cy.url().should('not.include', '/login')
})
