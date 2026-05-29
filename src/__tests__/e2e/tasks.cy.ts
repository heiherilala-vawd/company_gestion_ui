import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  task1Mock,
  task2Mock,
  tasksMock,
  crupdateTasksMock,
  createOrUpdateTasks,
} from '../mocks/responses/tasks-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectEnumType,
} from '../support/utils.ts'

describe('E2E: Tasks', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateTasksMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
      cy.get('[data-testid="input-id"] input').then(($input) => {
        $input.val('newId')
        $input.trigger('change')
      })
    } else {
      cy.contains(<string>task1Mock.title).click()
      cy.wait('@getTask')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-title"] input')
      .clear()
      .type(<string>crupdatedData.title)
    cy.get('[data-testid="input-description"] textarea:visible')
      .first()
      .clear()
      .type(<string>crupdatedData.description, { force: true })
    selectEnumType('input-status', 'Terminé')
    selectEnumType('input-priority', 'Haute')
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-tasks"]').click()
    cy.wait('@getTasks')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-tasks"]').scrollIntoView()
    cy.get('[data-testid="menu-tasks"]').click({ force: true })
    cy.wait('@getTasks')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>task1Mock.title).should('be.visible')
    cy.contains(<string>task2Mock.title).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>task1Mock.title).click()
    cy.wait('@getTask')
    cy.contains(<string>task1Mock.title).should('exist')
    cy.contains(<string>task1Mock.description).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/tasks', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTasks(req.body)))
    }).as('createTask')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createTask')
    cy.url().should('include', '/tasks')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/tasks', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTasks(req.body)))
    }).as('updateTask')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateTask')
    cy.url().should('include', '/tasks')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/tasks*', mockSuccessResponse(tasksMock)).as('getTasks')
    cy.intercept('GET', '**/tasks/task1_id', mockSuccessResponse(task1Mock)).as('getTask')
    cy.intercept('GET', '**/tasks/newId', mockSuccessResponse(task1Mock)).as('getTaskCreate')
    loginInPage()
  })

  it('should display tasks list', () => showList(true))
  it('should show task details', () => showDetails(true))
  it('should create a new task', () => canCreate(true))
  it('should update an existing task', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/tasks',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createTaskFail')
    creatOrUpdate(true)
    cy.wait('@createTaskFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/tasks',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateTaskFail')
    creatOrUpdate(false)
    cy.wait('@updateTaskFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display tasks list on mobile', () => showList(false))
  it('should show task details on mobile', () => showDetails(false))
  it('should create a new task on mobile', () => canCreate(false))
  it('should update an existing task on mobile', () => canUpdate(false))
})
