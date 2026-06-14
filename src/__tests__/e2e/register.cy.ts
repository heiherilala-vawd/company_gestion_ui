import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'

function typeIntoField(label: string, value: string) {
  cy.contains('label', label, { timeout: 15000 })
    .invoke('attr', 'for')
    .then((id) => {
      cy.get(`#${id}`).type(value)
    })
}

function visitRegister() {
  cy.visit('/', { failOnStatusCode: false })
  cy.contains(/S.inscrire/, { timeout: 15000 }).click()
  cy.contains(/S.inscrire/, { timeout: 15000 }).should('be.visible')
}

describe('E2E: Register', () => {
  it('should register a new user with password confirmation and without companies', () => {
    cy.intercept('POST', '**/auth/register', (req) => {
      expect(req.body).to.not.have.property('company_ids')
      expect(req.body.password).to.equal('password123')
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

    visitRegister()

    typeIntoField('Prénom', 'Jane')
    typeIntoField('Nom', 'Smith')
    typeIntoField('Email', 'jane.smith@company.com')
    typeIntoField('Mot de passe', 'password123')
    typeIntoField('Confirmer le mot de passe', 'password123')

    // CollapsibleOptionalFields opens the sex field; default value 'M' is fine
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

    visitRegister()

    typeIntoField('Prénom', 'Jane')
    typeIntoField('Nom', 'Smith')
    typeIntoField('Email', 'jane.smith@company.com')
    typeIntoField('Mot de passe', 'password123')
    typeIntoField('Confirmer le mot de passe', 'differentPassword')

    cy.get('button[type="submit"]').click()

    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should have a link back to login page', () => {
    visitRegister()

    cy.contains('Déjà un compte ? Connectez-vous').click()
    cy.url().should('include', '/login')
  })
})
