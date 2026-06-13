import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'

describe('E2E: Register', () => {
  it('should register a new user with password confirmation and without companies', () => {
    cy.intercept('POST', '**/auth/register', (req) => {
      expect(req.body).to.not.have.property('company_ids')
      expect(req.body.password).to.equal('password123')
      expect(req.body.password).to.equal(req.body.confirm_password)
      req.reply(
        mockSuccessResponse({
          token: 'new-user-token',
          type: 'Bearer',
          id: 'new_user_id',
          email: 'jane.smith@company.com',
          role: 'EMPLOYEE',
        }),
      )
    }).as('register')

    cy.visit('/register')

    cy.get('input[name="firstName"]').type('Jane')
    cy.get('input[name="lastName"]').type('Smith')
    cy.get('input[name="email"]').type('jane.smith@company.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('input[name="confirmPassword"]').type('password123')

    // Ouvrir "Plus de détails" pour les champs optionnels
    cy.contains('Plus de détails').click()

    // Sélectionner le sexe
    cy.get('[data-testid="input-sex"]').click()
    cy.contains('Femme').click({ force: true })

    cy.get('button[type="submit"]').click()

    cy.wait('@register')
    cy.get('.RaNotification-success').should('be.visible')
    cy.url().should('not.include', '/register')
  })

  it('should show error when passwords do not match', () => {
    cy.intercept(
      'POST',
      '**/auth/register',
      mockErrorResponse('BadRequestException', 'Passwords do not match', 400),
    ).as('registerFail')

    cy.visit('/register')

    cy.get('input[name="firstName"]').type('Jane')
    cy.get('input[name="lastName"]').type('Smith')
    cy.get('input[name="email"]').type('jane.smith@company.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('input[name="confirmPassword"]').type('differentPassword')

    cy.get('button[type="submit"]').click()

    // Should not submit if passwords don't match
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should have a link back to login page', () => {
    cy.visit('/register')
    cy.contains('Déjà un compte ? Connectez-vous').click()
    cy.url().should('include', '/login')
  })
})
