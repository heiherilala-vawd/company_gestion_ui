import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  travelPeople1Mock,
  createOrUpdateTravelPeoples,
  travelPeople2Mock,
} from '../mocks/responses/travel-people-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectUser,
} from '../support/utils.ts'

describe('E2E: Travel People', () => {
  function updateRecord() {
    cy.contains('td', <string>travelPeople1Mock.user?.first_name).click({ force: true })
    cy.wait('@getTravelPeople', { timeout: 15000 })
    cy.get('.RaEditButton-root').click({ force: true })
    selectUser()
    cy.get('[data-testid="input-comment"]')
      .find('textarea.MuiOutlinedInput-input')
      .first()
      .clear()
      .type('new comment')
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-travel-peoples"]').click()
    cy.wait('@getTravelPeoples')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-travel-peoples"]').scrollIntoView()
    cy.get('[data-testid="menu-travel-peoples"]').click({ force: true })
    cy.wait('@getTravelPeoples')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(
      <string>(
        (travelPeople1Mock.travel?.departure_location?.name +
          ' → ' +
          travelPeople1Mock.travel?.arrival_location?.name)
      ),
    ).should('be.visible')
    cy.contains(
      <string>(
        (travelPeople2Mock.travel?.departure_location?.name +
          ' → ' +
          travelPeople2Mock.travel?.arrival_location?.name)
      ),
    ).should('be.visible')
    cy.contains(<string>travelPeople1Mock.user?.first_name).should('be.visible')
    cy.contains(<string>travelPeople2Mock.user?.first_name).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains('td', <string>travelPeople1Mock.user?.first_name).click({ force: true })
    cy.wait('@getTravelPeople', { timeout: 15000 })
    cy.contains(<string>travelPeople1Mock.arrival_location?.name).should('exist')
    cy.contains(
      travelPeople1Mock.user?.first_name + ' ' + travelPeople1Mock.user?.last_name,
    ).should('exist')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/travel_people*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTravelPeoples(req.body)))
    }).as('updateTravelPeople')
    updateRecord()
    cy.wait(3000)
    cy.wait('@updateTravelPeople')
    cy.url().should('include', '/travel_people')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display travel peoples list', () => showList(true))
  it('should show travel people details', () => showDetails(true))
  it('should update an existing travel people', () => canUpdate(true))

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/travel_people*',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateTravelPeopleFail')
    updateRecord()
    cy.wait('@updateTravelPeopleFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display travel peoples list on mobile', () => showList(false))
  it('should show travel people details on mobile', () => showDetails(false))
  it('should update an existing travel people on mobile', () => canUpdate(false))
})
