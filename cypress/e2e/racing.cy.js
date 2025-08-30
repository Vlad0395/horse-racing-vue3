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
    cy.get('.btn-generate').click()
    cy.get('.info-panel').should('be.visible')
  })
  it('should start race when button clicked', () => {
    cy.visit('/racing')
    cy.get('.btn-generate').click()
    cy.get('.btn-start').click()
    cy.get('.info-panel').should('be.visible')
  })

  describe('Horse finish position', () => {
    it('should stop horse at the finish line', () => {
      cy.visit('/racing')
      cy.get('.btn-generate').click()
      cy.get('.btn-start').click()

      cy.wait(60000)

      cy.get('.racetrack__finish-line').then(($finish) => {
        const finishLeft = $finish[0].getBoundingClientRect().left
        console.log('finishLeft :>> ', finishLeft)
        cy.get('.horse').each(($horse) => {
          const horseLeft = $horse[0].getBoundingClientRect().left
          expect(horseLeft).to.be.at.most(finishLeft + 2)
        })
      })
    })
  })
  describe('Horse Racing Mobile Responsiveness', () => {
    const width = 375
    const height = 466
    it('should show and allow scrolling of the racetrack on mobile', () => {
      cy.viewport(width, height)
      cy.visit('/racing')
      cy.get('.racetrack').should('be.visible')
      cy.get('.racetrack').then(($el) => {
        const el = $el[0]
        expect(el.scrollHeight).to.be.greaterThan(el.clientHeight)
      })
      cy.get('.racetrack').scrollTo('bottom')
      cy.get('.racetrack__finish-line').should('be.visible')
    })
  })
})
