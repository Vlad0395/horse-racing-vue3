describe('Horse Racing View', () => {
  it('should render main title', () => {
    cy.visit('/racing')
    cy.contains('Horse Racing').should('be.visible')
  })
  it('should render btns', () => {
    cy.visit('/racing')
    cy.contains('Generate program').should('be.visible')
    cy.contains('Start').should('be.visible')
  })

  it('should show list of horses', () => {
    cy.visit('/racing')
    cy.get('.horse-list').should('exist')
  })

  it('should generate programs to races when button clicked', () => {
    cy.visit('/racing')
    cy.get('.btn-generate-races').click()
    cy.get('.program__round').should('be.visible')
  })
  it('should start race when button clicked', () => {
    cy.visit('/racing')
    cy.get('.btn-generate-races').click()
    cy.get('.btn-start-race').click()
    cy.get('.results__round').should('be.visible')
  })

  // Додатково: перевірку таблиць, результатів, переходів
})