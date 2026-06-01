import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  team1Mock,
  team2Mock,
} from '../mocks/responses/teams-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
} from '../support/utils.ts'

describe('E2E: Teams', () => {
  function selectReferenceMobile(testId: string, optionText: string) {
    cy.get(`[data-testid="${testId}"]`)
      .scrollIntoView()
      .within(() => {
        cy.get('[role="combobox"], .MuiSelect-select').first().click({ force: true })
      })
    cy.get('[role="option"]', { timeout: 10000 }).should('be.visible')
    cy.contains('[role="option"]', optionText).click({ force: true })
  }

  function creatOrUpdate(isCreating: boolean) {
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
    } else {
      cy.contains(<string>team1Mock.name).click()
      cy.wait('@getTeam')
      cy.get('.RaEditButton-root').click({ force: true })
    }
    cy.get('[data-testid="input-name"] input')
      .clear()
      .type('Équipe test')
    if (!isCreating) {
      selectReferenceMobile('input-leader_id', 'John Doe')
    }
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-teams"]').click()
    cy.wait('@getTeams')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-teams"]').scrollIntoView()
    cy.get('[data-testid="menu-teams"]').click({ force: true })
    cy.wait('@getTeams')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>team1Mock.name).should('be.visible')
    cy.contains(<string>team2Mock.name).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>team1Mock.name).click()
    cy.wait('@getTeam')
    cy.contains(<string>team1Mock.name).should('be.visible')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '/companies/*/teams*', (req) => {
      req.reply(mockSuccessResponse([{ id: 'newTeamId', ...req.body[0], name: 'Équipe test' }]))
    }).as('createTeam')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createTeam')
    cy.url().should('include', '/teams')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '/companies/*/teams*', (req) => {
      req.reply(mockSuccessResponse([{ id: 'team1_id', ...req.body[0], name: 'Équipe test' }]))
    }).as('updateTeam')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateTeam')
    cy.url().should('include', '/teams')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display teams list', () => showList(true))
  it('should show team details', () => showDetails(true))
  it('should create a new team', () => canCreate(true))
  it('should update an existing team', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '/companies/*/teams*',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createTeamFail')
    creatOrUpdate(true)
    cy.wait('@createTeamFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '/companies/*/teams*',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateTeamFail')
    creatOrUpdate(false)
    cy.wait('@updateTeamFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display teams list on mobile', () => showList(false))
  it('should show team details on mobile', () => showDetails(false))
  it('should create a new team on mobile', () => canCreate(false))
  it('should update an existing team on mobile', () => canUpdate(false))
})
