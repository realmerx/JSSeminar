describe('movie tests', () => {
  it('loads third movie details when clicking view button on third movie', () => {
    cy.intercept("/movies").as("getMovies");
    cy.intercept("/movies/*").as("getMovie");
    
    cy.visit('/');
    cy.wait("@getMovies");

    cy.get("[data-cy=movie]:nth(2) [data-cy=movie-show-details]").click();
    cy.wait("@getMovie");

    cy.get("#movie-details").should("be.visible");

    cy.get("#movie-title").should("have.text", "The Dark Knight");
  })
});
