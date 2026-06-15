describe('r', () => {
  it('r', () => {
    cy.visit('/register', { failOnStatusCode: false })
    cy.wait(8000)
    cy.url().then(u => cy.log('URL: ' + u))
    cy.window().then(w => {
      cy.log('HREF: ' + w.location.href)
      cy.log('HTML: ' + w.document.body.innerHTML.substring(0, 3000))
    })
  })
})
