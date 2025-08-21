describe('Welcome page', () => {
  it('should show title and start button', () => {
    cy.visit('/')
    cy.contains('Welcome to the Horse Racing Main Page!')
    cy.get('.start-btn').click()
    cy.url().should('include', '/racing')
  })
})
