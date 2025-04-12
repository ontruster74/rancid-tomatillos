import movieDetails from "../../src/data/movie_details"

describe('template spec', () => {
  beforeEach(() => {
    cy.intercept ("GET","https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies", {
      statusCode: 200,
      fixture: "movie_posters"
    })

    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/*", {
      statusCode: 200, 
      fixture:"movie_details"
    })

    cy.visit('http://localhost:3000/')
  })
  
  it("should display the home page with movie posters", () => {
      cy.get(".MoviesContainer").should("exist");
      cy.get("header").should("exist")
      cy.get("h1").should("contain", "rancid tomatillos")
    });
    
  it("Should display the movie details page when you click on a movie poster", () => {
    cy.get(".MoviePoster img").first().click()
    cy.get(".MoviePoster").should("not.exist")
    cy.get(".MovieDetails img").should("have.attr", "src").and("include", "yRKyJJYIzfeiVDHBe4LXguPQCvD.jpg")
    cy.get("h1").should("contain", "rancid tomatillos")
    cy.get(".MovieDetails").should("exist")
    cy.get("h2").should("contain", "Beetlejuice")
    cy.get(".genre-container").should("contain", "Comedy")
    cy.get(".genre-container").should("contain", "Fantasy")
    cy.get("p").should("contain", "A newly dead New England couple seeks help from a deranged demon exorcist to scare an affluent New York family out of their home.")
  })
  
  it("Should go back to the home page when you click on the home button", () => {
    cy.get(".MoviesContainer").should("exist")
    cy.get(".MoviePoster img").first().click()
    cy.get(".MovieDetails").should("be.visible")
    cy.get("h1").should("contain", "rancid tomatillos")
    cy.get("header").should("exist")
    cy.get("header").find('a[href="/"], .homeButton, [data-testid="home-button"]').first().should('be.visible').click()
    cy.get(".MoviesContainer").should("be.visible")
    cy.get(".MovieDetails").should("not.exist")
    cy.get("header").find("homeButton").should("not.exist")
  })

  it("Sad path: returns an error for movie details not included in database", () => {
    const invalidId = '1'
    cy.intercept("GET", `https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${invalidId}`, { statusCode: 404 , body: {error: "No details found for this movie"}})
    .as("invalidDetails")
    cy.visit(`http://localhost:3000/movies/${invalidId}`)
    cy.wait('@invalidDetails')
    cy.get('[data-testid="error-message"]')
    .should('be.visible')
    .and('contain', '404')
    .and('contain', 'No details found for this movie.')
    cy.url().should('include', `/movies/${invalidId}`)
  })
});

