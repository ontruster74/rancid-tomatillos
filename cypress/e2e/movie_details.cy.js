import movieDetails from "../../src/data/movie_details"

describe('template spec', () => {
  beforeEach(() => {
    cy.intercept ("GET","https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies", {
      statusCode: 200,
      fixture: "movie_posters"
    }).as("getMovies")

    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/*", {
      statusCode: 200, 
      fixture:"movie_details"
    }).as("getMovieDetails")

    cy.visit('http://localhost:3000/')
    cy.wait("@getMovies")
  })
  
  it("should display the home page with movie posters", () => {
      cy.get(".MoviesContainer").should("exist");
      cy.get("header").should("exist")
      cy.get("h1").should("contain", "rancid tomatillos")
    });
    
  it("Should display the movie details page when you click on a movie poster", () => {
    cy.get(".MovieDetails").should("not.exist")
    cy.get(".MoviePoster img").first().click()
    cy.location("pathname").should("include", "/movies/155")
    cy.url().should("include", "/movies/")
    cy.wait("@getMovieDetails")

    cy.get(".MovieDetails").should("exist")
    cy.get(".MoviePoster").should("not.exist")
    cy.get(".MovieDetails img",)
    .should("have.attr", "src")
    .and("include", "nMKdUUepR0i5zn0y1T4CsSB5chy.jpg")
    cy.get("h1").should("contain", "rancid tomatillos")
    cy.get("h2").should("contain", "The Dark Knight")
    cy.get(".genre-container").should("contain", "Drama")
    cy.get(".genre-container").should("contain", "Action")
    cy.get(".genre-container").should("contain", "Crime")
    cy.get(".genre-container").should("contain", "Thriller")
    cy.get("p").should("contain", "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.")
  })
  
  it("Should go back to the home page when you click on the home button", () => {
    cy.get(".MoviesContainer").should("exist")
    cy.get(".MoviePoster img").first().click()
    cy.get(".MovieDetails").should("be.visible")
    cy.wait("@getMovieDetails")

    cy.get(".MovieDetails").should("exist")
    cy.get("h1").should("contain", "rancid tomatillos")
    cy.get("header").should("exist")
    cy.get("header").find('a[href="/"], .homeButton, [data-testid="home-button"]').first().should('be.visible').click()
    cy.get(".MoviesContainer").should("be.visible")
    cy.get(".MovieDetails").should("not.exist")
    cy.get("header").find("homeButton").should("not.exist")
  })

  it("Should return an error if the network fails", () => {
    cy.intercept("GET", "**/movies/*", { forceNetworkError: true }).as("getMovieDetails")
    cy.visit("http://localhost:3000")

    cy.get(".MoviePoster img").first().click()
    cy.wait("@getMovieDetails")
    cy.wait("@getMovieDetails")
    cy.get(".error-message").should("be.visible")
  })

  it("Should display an error message if user visits a URL with invalid movie id", () => {
    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/2", {
      statusCode: 200,
      body: { error: "Movie not found" }
    }).as("getMovieDetails");
  
    cy.visit("http://localhost:3000/movies/2");
  
    cy.get(".error-message").should("be.visible");
    cy.contains("Uh Oh! No movie found with id: 2").should("exist");
  });
});

