// Test du menu principal, sélecteurs et responsive
import { companiesMock } from '../mocks/responses/companies-api'
import { jobsMock } from '../mocks/responses/jobs-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Main Menu and Selectors', () => {
  const expectedMenuItemsPart1 = [
    'Accueil',
    'Entreprises',
    'Travaux',
    'Tâches',
    'Planification',
    'Utilisateurs',
    'Salaires',
    'Transport personnel',
    'Entrepôts',
    'Matériaux',
    'Matériaux dépl.',
    'Équipements',
    'Équipement dépl.',
    'Maintenance',
  ]

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display all menu items on desktop', () => {
    cy.viewport(1280, 720)

    // Vérifier que le menu à gauche est visible
    cy.get('[class*="RaSidebar"]').should('be.visible')

    expectedMenuItemsPart1.forEach((item) => {
      cy.contains('[data-testid="menu-item-home"]', item).scrollIntoView().should('be.visible')
    })

    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)

    // Expand Monétaire sub-sections to check collapsed items
    cy.contains('Monétaire').scrollIntoView()
    cy.contains('Entrées').click()
    cy.contains('Sorties ponctuelles').click()
    cy.contains('Sorties continues').click()
    cy.contains('Trésorerie').click()
    cy.wait(300)

    const expectedMenuItemsPart2 = [
      'Achats',
      'Congés',
      'Jour de congés',
      'Stock',
      'Conso. matériaux',
      'Utilisation',
      'Revenus',
      'Dépenses',
      'Déplacements',
      'Frais bancaire',
      'Autres dépenses',
      'Budgets',
      'Comptes caisse',
      'Historique',
    ]
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

    cy.get('[role="listbox"]').should('not.exist')

    // Cliquer sur le sélecteur de job (deuxième select)
    cy.contains('Job:').closest('div').find('[role="combobox"]').click()
    cy.wait('@getJobs')

    // Vérifier que les jobs s'affichent
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

    const mobileExpectedItems = [
      'Accueil',
      'Entreprises',
      'Travaux',
      'Tâches',
      'Planification',
      'Utilisateurs',
      'Salaires',
      'Transport personnel',
      'Entrepôts',
      'Matériaux',
    ]
    mobileExpectedItems.forEach((item) => {
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
  })

  it('should adapt layout for mobile view', () => {
    cy.viewport(375, 667)

    // Vérifier que l'app bar est visible
    cy.get('[class*="RaAppBar"]').should('be.visible')

    // Sur mobile, le menu est caché par défaut
    cy.get('.RaSidebar-modal').should('not.be.visible')

    // Ouvrir le menu
    cy.get('[class*="RaSidebarToggleButton"]').first().click()

    const mobileExpectedItems = [
      'Accueil',
      'Entreprises',
      'Travaux',
      'Tâches',
      'Planification',
      'Utilisateurs',
      'Salaires',
      'Transport personnel',
      'Entrepôts',
      'Matériaux',
    ]
    mobileExpectedItems.forEach((item) => {
      cy.contains('[data-testid="menu-item-home"]', item).scrollIntoView().should('be.visible')
    })
    // ferme le menu
    cy.wait(200)
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0) // clique hors menu
      }
    })
    cy.wait(500)

    // Sur mobile, les sélecteurs sont masqués par défaut - cliquer pour les afficher
    cy.get('[data-testid="toggle-selectors"]').should('exist').click({ force: true })
    cy.wait(1000)
    // Sur mobile (<600px), le label "Company:" n'est pas rendu (isXs=true dans GenericSelector)
    // On vérifie que le Collapse s'est ouvert
    cy.get('.MuiCollapse-entered').should('exist')
  })
})
