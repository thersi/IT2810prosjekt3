  //NEED TO ADD TEST FOR SORTING ON YEAR (ASC+DESC)
  //AND TITLE (ASC+DESC)
  //MABY FIND BETTER SOLUTION FOR BEFORE EACH INSTEAD
  //OF REVISITING PAGE BEFORE EACH

describe("Test the movie web applicatoin", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
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
  });

  it("Test give thumbs down", () => {
    cy.contains("Avengers: Endgame").click()
    const initVotes = cy.get("#sumDown")
    cy.get("#thUp").click();
    const afterVoted = cy.get("#sumDown")
    expect(afterVoted).to.not.equal(initVotes)
  });

});
