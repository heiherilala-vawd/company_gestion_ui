import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  cars1Mock,
  cars2Mock,
  crupdateCarsMock,
  createOrUpdateCars,
} from '../mocks/responses/cars-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectEnumType,
} from '../support/utils.ts'

describe('E2E: Cars', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateCarsMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
    } else {
      cy.contains(<string>cars1Mock.immatriculation).click()
      cy.wait('@getCarsDetail')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-immatriculation"] input')
      .clear()
      .type(<string>crupdatedData.immatriculation)
    selectEnumType('input-type_carburant', 'Diesel')
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-cars"]').click()
    cy.wait('@getCars')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-cars"]').scrollIntoView()
    cy.get('[data-testid="menu-cars"]').click({ force: true })
    cy.wait('@getCars')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>cars1Mock.immatriculation).should('be.visible')
    cy.contains(<string>cars2Mock.immatriculation).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>cars1Mock.immatriculation).click()
    cy.wait('@getCarsDetail')
    cy.contains(<string>cars1Mock.immatriculation).should('be.visible')
    cy.contains(<string>cars1Mock.marque).should('be.visible')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/cars', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateCars(req.body)))
    }).as('createCars')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createCars')
    cy.url().should('include', '/cars')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/cars', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateCars(req.body)))
    }).as('updateCars')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateCars')
    cy.url().should('include', '/cars')
  }

  beforeEach(() => {
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  it('should display cars list', () => showList(true))
  it('should show cars details', () => showDetails(true))
  it('should create a new car', () => canCreate(true))
  it('should update an existing car', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/cars',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createCarsFail')
    creatOrUpdate(true)
    cy.wait('@createCarsFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/cars',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateCarsFail')
    creatOrUpdate(false)
    cy.wait('@updateCarsFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display cars list on mobile', () => showList(false))
  it('should show cars details on mobile', () => showDetails(false))
  it('should create a new car on mobile', () => canCreate(false))
  it('should update an existing car on mobile', () => canUpdate(false))
})
