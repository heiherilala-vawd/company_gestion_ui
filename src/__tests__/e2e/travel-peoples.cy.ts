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
  selectTravelExpense,
  selectUser,
} from '../support/utils.ts'

describe('E2E: Travel People', () => {
  function creatOrUpdate(isCreating: boolean) {
    if (isCreating) {
      cy.contains('Create').click()
    } else {
      cy.contains(<string>travelPeople1Mock.arrival_location?.name).click()
      cy.wait('@getTravelPeople')
      cy.get('.RaEditButton-root').click()
    }
    selectTravelExpense('Déplacement: ' + travelPeople1Mock.travel?.expense?.description)
    selectUser()
    cy.get('[data-testid="input-comment"]')
      .find('textarea.MuiOutlinedInput-input')
      .first()
      .clear()
      .type('new comment')
    cy.get('button[type="submit"]').click()
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-travel-peoples"]').click()
    cy.wait('@getTravelPeoples')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[class*="RaSidebarToggleButton"]').first().click()
    cy.get('[data-testid="menu-travel-peoples"]').click()
    cy.wait('@getTravelPeoples')
    cy.get('[class*="RaSidebarToggleButton"]').first().click()
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
    cy.contains(<string>travelPeople1Mock.arrival_location?.name).click()
    cy.wait('@getTravelPeople')
    cy.contains(<string>travelPeople1Mock.arrival_location?.name).should('exist')
    cy.contains(
      travelPeople1Mock.user?.first_name + ' ' + travelPeople1Mock.user?.last_name,
    ).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/travel_people*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTravelPeoples(req.body)))
    }).as('createTravelPeople')
    creatOrUpdate(true)
    cy.wait('@createTravelPeople')
    cy.url().should('include', '/travel_people')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/travel_people*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTravelPeoples(req.body)))
    }).as('updateTravelPeople')
    creatOrUpdate(false)
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
  it('should create a new travel people', () => canCreate(true))
  it('should update an existing travel people', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/travel_people*',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createTravelPeopleFail')
    creatOrUpdate(true)
    cy.wait('@createTravelPeopleFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/travel_people*',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateTravelPeopleFail')
    creatOrUpdate(false)
    cy.wait('@updateTravelPeopleFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display travel peoples list on mobile', () => showList(false))
  it('should show travel people details on mobile', () => showDetails(false))
  it('should create a new travel people on mobile', () => canCreate(false))
  it('should update an existing travel people on mobile', () => canUpdate(false))
})
