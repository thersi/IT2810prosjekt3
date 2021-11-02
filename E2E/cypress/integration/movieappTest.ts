/**
 * Performes end-2-end testing using Cypress. 
 */

describe("Test the movie web applicatoin", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
    cy.clearLocalStorage();
  });

  it("test visit the page", () => {
    cy.visit("localhost:3000")
  })

  it("test find (alphabetically first) movie ", () => {
    cy.contains("Avengers: Endgame");
  });

  it("test search", () => {
    cy.get("#search-bar").click().type("Luca").type("{enter}");
    cy.contains("Luca");
  });

  it("Test filter on genre", () => {
    cy.get("#demo-simple-select-standard").click();
    cy.contains("HISTORY");
    cy.contains("ACTION");
    cy.contains("MUSIC")
    cy.contains("WAR").click()
    cy.contains("Saving Private Ryan")
  });

  it("test view details", () => {
    cy.contains("Avengers: Endgame").click()
    cy.contains("Genres");
    cy.contains("Actors")
    cy.contains("Year")
    cy.contains("Title")
    cy.contains("Action,Adventure,Drama")
    cy.contains("Robert Downey Jr.,Chris Evans,Mark Ruffalo")
  });

  it("Test give thumbs up", () => {
    cy.contains("Avengers: Endgame").click()
    const initVotes = cy.get("#sumUp")
    cy.get("#thUp").click();
    const afterVoted = cy.get("#sumUp")
    expect(afterVoted).to.not.equal(initVotes)
    cy.get('#thUp').should('be.disabled')
  });

  it("Test give thumbs down", () => {
    cy.contains("Avengers: Infinity War").click()
    const initVotes = cy.get("#sumDown")
    cy.get("#thDown").click();
    const afterVoted = cy.get("#sumDown")
    expect(afterVoted).to.not.equal(initVotes)
  });

  it("Test sort year", () => {
    cy.get("#sortButton").click();
    cy.contains("Year");
    cy.contains("Title");
    cy.contains("Asc");
    cy.contains("Desc");
    cy.get("#checkYear").click();
    cy.get("#checkAsc").click();
    cy.contains("Citizen Kane")
    cy.get("#checkDesc").click();
    cy.contains("No Time to Die");
  });

  it("Test sort title", () => {
    cy.get("#sortButton").click();
    cy.get("#checkTitle").click();
    cy.get("#checkDesc").click();
    cy.contains("There's Someone Inside Your House");
    cy.get("#checkAsc").click();
    cy.contains("Avengers: Endgame");
  });

});
