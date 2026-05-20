import { mockSuccessResponse } from '../mocks/responses/auth-api'
import { otherExpenseTypesMock } from '../mocks/responses/other-expense-type-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('Other Expenses Debug', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('check create form selects', () => {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 }).wait(200)
    cy.get('[data-testid="menu-other-expenses"]').click()
    cy.wait('@getOtherExpenses')
    cy.get('[class*="RaCreateButton"]').click()
    cy.wait(4000)
    cy.get('[data-testid="input-other_expense_types-id"]').should('exist')
    cy.get('[data-testid="input-other_expense_types-id"] [role="combobox"]').click()
    cy.wait(2000)
    cy.document().then((doc) => {
      const listboxes = doc.querySelectorAll('[role="listbox"]')
      cy.log('NUMBER OF LISTBOXES: ' + listboxes.length)
      listboxes.forEach((lb, i) => {
        cy.log('LISTBOX ' + i + ' ID: ' + (lb.id || 'NO ID'))
        cy.log('LISTBOX ' + i + ' TEXT: ' + (lb.textContent || '').substring(0, 200))
      })
      const allListbox = doc.querySelectorAll('[id*="menu-"]')
      cy.log('NUMBER OF menu- IDS: ' + allListbox.length)
      allListbox.forEach((el, i) => {
        cy.log('MENU-' + i + ' ID: ' + el.id + ' TEXT: ' + (el.textContent || '').substring(0, 200))
      })
    })
  })
})
