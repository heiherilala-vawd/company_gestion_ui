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
      cy.contains(
        travelPeople1Mock.user?.first_name + ' ' + travelPeople1Mock.user?.last_name,
      ).click()
      cy.wait('@getTravelPeople')
      cy.contains('Edit').click()
    }
    selectTravelExpense('Déplacement: ' + travelPeople1Mock.travel?.expense?.description)
    selectUser()
    cy.get('button[type="submit"]').click()
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
    cy.get('[data-testid="menu-travel-peoples"]').click()
    cy.wait('@getTravelPeoples')
  })

  it('should display travel peoples list', () => {
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
    cy.contains(
      travelPeople1Mock.user?.first_name + ' ' + travelPeople1Mock.user?.last_name,
    ).should('be.visible')
    cy.contains(
      travelPeople2Mock.user?.first_name + ' ' + travelPeople2Mock.user?.last_name,
    ).should('be.visible')
  })

  it('should show travel people details', () => {
    cy.contains(
      travelPeople1Mock.user?.first_name + ' ' + travelPeople1Mock.user?.last_name,
    ).click()
    cy.wait('@getTravelPeople')
    cy.contains(<string>travelPeople1Mock.arrival_location?.name).should('exist')
    cy.contains(
      travelPeople1Mock.user?.first_name + ' ' + travelPeople1Mock.user?.last_name,
    ).should('exist')
  })

  it('should create a new travel people', () => {
    cy.intercept('PUT', '**/travel_people*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTravelPeoples(req.body)))
    }).as('createTravelPeople')
    creatOrUpdate(true)
    cy.wait('@createTravelPeople')
    cy.url().should('include', '/travel_people')
  })

  it('should update an existing travel people', () => {
    cy.intercept('PUT', '**/travel_people*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTravelPeoples(req.body)))
    }).as('updateTravelPeople')
    creatOrUpdate(false)
    cy.wait('@updateTravelPeople')
    cy.url().should('include', '/travel_people')
  })

  it('should show error on create failure', () => {
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
    cy.intercept(
      'PUT',
      '**/travel_people*',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateTravelPeopleFail')
    creatOrUpdate(false)
    cy.wait('@updateTravelPeopleFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
