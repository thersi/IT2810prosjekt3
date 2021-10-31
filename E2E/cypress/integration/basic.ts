it("Can visit the page", () => {
  cy.visit("localhost:3000")
})

it("Finds a movie", () => {
  cy.contains("The Godfather");
});

it("Can search", () => {
  cy.get("#search-bar").click().type("Av").type("{enter}");
  cy.contains("Avengers: Endgame");
});
