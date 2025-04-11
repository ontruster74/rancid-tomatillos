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
  
  it("Should got back to the home page when you click on the home button", () => {
    cy.get(".MoviesContainer").should("exist")
    cy.get(".MoviePoster img").first().click()
    cy.get(".MovieDetails").should("exist")
    cy.get("h1").should("contain", "rancid tomatillos")
    cy.get("button").should("exist")
    cy.get("button").should("have.class", "homeButton")
    cy.get("button img").should("have.attr", "alt", "Home Button")
    cy.get(".homeButton").click()
    cy.get(".MoviesContainer").should("exist")
    cy.get(".MovieDetails").should("not.exist")
  })

  it("Should return an error if the network fails", () => {
    cy.intercept("GET", "**/movies/*", { forceNetworkError: true }).as("getMovieDetails")
    cy.visit("http://localhost:3000")
    cy.get(".MoviePoster img").first().click()
    cy.wait("@getMovieDetails")
    cy.get(".error-message").should("be.visible")
  })
});

