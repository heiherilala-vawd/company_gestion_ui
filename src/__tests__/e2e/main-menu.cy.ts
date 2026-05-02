// Test du menu principal, sélecteurs et responsive
import { mockSuccessResponse } from '../mocks/responses/auth-api'
import { companiesMock } from '../mocks/responses/companies-api'
import { jobsMock } from '../mocks/responses/jobs-api'
import { expense1Mock } from '../mocks/responses/expenses-api'
import { user1Mock } from '../mocks/responses/users-api'

describe('E2E: Main Menu and Selectors', () => {
  const expectedMenuItemsPart1 = [
    '🏠 Home',
    '📋 Jobs',
    '🏢 Companies',
    '👥 Users',
    '🏭 Warehouse',
    '🔧 Equipments',
  ]

  const expectedMenuItemsPart2 = [
    '📦 Materials',
    '💸 Dépenses',
    '✈️ Déplacements',
    '🛒 Achats',
    '🏦 Frais bancaire',
    '📝 Autres',
    '💰 Salaires',
  ]

  beforeEach(() => {
    // Intercepter les endpoints d'authentification
    cy.intercept(
      'POST',
      '**/auth/login',
      mockSuccessResponse({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        type: 'Bearer',
        id: user1Mock.id,
        email: user1Mock.email,
        role: user1Mock.role,
      }),
    ).as('login')

    cy.intercept(
      'GET',
      '**/auth/whoami',
      mockSuccessResponse({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        type: 'Bearer',
        id: user1Mock.id,
        email: user1Mock.email,
        role: user1Mock.role,
      }),
    ).as('whoami')

    // Intercepter les endpoints pour les sélecteurs
    cy.intercept('GET', '**/companies', mockSuccessResponse(companiesMock)).as('getCompanies')
    cy.intercept('GET', '**/companies/*/jobs', mockSuccessResponse(jobsMock)).as('getJobs')
    cy.intercept('GET', '**/companies/*/jobs/*/users', mockSuccessResponse([user1Mock])).as(
      'getJobUsers',
    )
    cy.intercept('GET', '**/expenses', mockSuccessResponse([expense1Mock])).as('getExpenses')

    // Login
    cy.clearLocalStorage()
    cy.visit('/', { failOnStatusCode: false })
    cy.get('input[name="username"]').type(<string>user1Mock.email)
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    cy.wait('@login')
    cy.wait('@whoami')
  })

  it('should display all menu items on desktop', () => {
    cy.viewport(1280, 720)

    // Vérifier que le menu à gauche est visible
    cy.get('[class*="RaSidebar"]').should('be.visible')

    expectedMenuItemsPart1.forEach((item) => {
      cy.contains('[data-testid="menu-item-home"]', item).scrollIntoView().should('be.visible')
    })

    cy.get('.RaSidebar-fixed').scrollTo('bottom', { duration: 500 })
    cy.wait(200) // laisse le temps au DOM de finir

    expectedMenuItemsPart2.forEach((item) => {
      cy.contains('[data-testid="menu-item-home"]', item).scrollIntoView().should('exist')
    })
  })

  it('should display company selector and load companies', () => {
    cy.viewport(1280, 720)

    // Cliquer sur le sélecteur de compagnie en cherchant le texte "Company:"
    cy.contains('Company:').closest('div').find('[role="combobox"]').click()
    cy.wait('@getCompanies')

    // Vérifier que les compagnies s'affichent
    cy.get('[role="listbox"]')
      .should('be.visible')
      .within(() => {
        cy.contains(<string>companiesMock[0].name).should('be.visible')
      })
    cy.get('[role="listbox"]')
      .should('be.visible')
      .within(() => {
        cy.contains(<string>companiesMock[1].name).should('be.visible')
      })
  })

  it('should display job selector and load jobs after company selection', () => {
    cy.viewport(1280, 720)

    // Sélectionner une company d'abord
    cy.contains('Company:').closest('div').find('[role="combobox"]').click()
    cy.wait('@getCompanies')
    cy.get('[role="listbox"]')
      .should('be.visible')
      .within(() => {
        cy.contains(<string>companiesMock[0].name).click()
      })

    // Cliquer sur le sélecteur de job (deuxième select)
    cy.contains('Job:').closest('div').find('[role="combobox"]').click()
    cy.wait('@getJobs')

    // Vérifier que les jobs s'affichent
    cy.get('[role="listbox"]')
      .should('be.visible')
      .within(() => {
        cy.contains(<string>jobsMock[0].description).should('be.visible')
      })

    cy.get('[role="listbox"]')
      .should('be.visible')
      .within(() => {
        cy.contains(<string>jobsMock[0].description).should('be.visible')
      })
  })

  it('should toggle menu visibility on mobile when clicking menu button', () => {
    // Tester en vue mobile (375x667 - iPhone SE)
    cy.viewport(375, 667)

    // Sur mobile, le menu est caché par défaut - le bouton menu devrait être visible
    cy.get('[class*="RaSidebarToggleButton"]').first().should('be.visible')

    // Cliquer sur le bouton de menu (hamburger)
    cy.get('[class*="RaSidebarToggleButton"]').first().click()

    // Vérifier que le menu s'affiche
    cy.get('[class*="RaSidebar"]').should('be.visible')

    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0) // clique hors menu
      }
    })

    expectedMenuItemsPart1.forEach((item) => {
      cy.contains('[data-testid="menu-item-home"]', item).scrollIntoView().should('be.visible')
    })
  })

  it('should show all buttons in app bar on desktop', () => {
    cy.viewport(1280, 720)

    // Vérifier que l'app bar est visible
    cy.get('[data-testid="menu-item-selector-home"]').should('be.visible')

    // Vérifier que les sélecteurs sont présents en cherchant leur label
    cy.contains('Company:').should('be.visible')
    cy.contains('Job:').should('be.visible')
    cy.contains('Expense:').should('be.visible')
  })

  it('should adapt layout for mobile view', () => {
    cy.viewport(375, 667)

    // Vérifier que l'app bar est visible
    cy.get('[class*="RaAppBar"]').should('be.visible')

    // Sur mobile, le menu est caché par défaut
    cy.get('.RaSidebar-modal').should('not.be.visible')

    // Ouvrir le menu
    cy.get('[class*="RaSidebarToggleButton"]').first().click()

    expectedMenuItemsPart1.forEach((item) => {
      cy.contains('[data-testid="menu-item-home"]', item).scrollIntoView().should('be.visible')
    })
    // Ouvrir le menu
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0) // clique hors menu
      }
    })

    cy.get('[class*="MuiBackdrop-root"]').click({ force: true })
    cy.get('.RaSidebar-modal').should('not.be.visible')

    // Vérifier que l'app bar est visible
    cy.get('[data-testid="menu-item-selector-home"]').should('be.visible')

    // Vérifier que les sélecteurs sont présents en cherchant leur label
    cy.contains('Company:').should('exist')
    cy.contains('Job:').should('exist')
    cy.contains('Expense:').should('exist')
  })
})
