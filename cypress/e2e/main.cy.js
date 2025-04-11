// Mock data to use for testing:
import posters from '../fixtures/movie_posters.json' // (we've added mock data to this file for you!)
// import details from '../fixtures/movie_details.json' (you will need to add your own mock data to this file!)

describe('Movie Posters', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies', { statusCode: 200, body: posters })
    .as('fetchMovies')

    cy.visit('http://localhost:3000/')

    cy.wait('@fetchMovies')
  })

  it('has a title', () => {
    cy.get('h1')
    .contains('rancid tomatillos')
  })

  it('has a collection of movies', () => {
    cy.get('.MoviesContainer')
    .should('exist')
    .and('be.visible')
    .and('have.length', 1)
  })

  it('has four posters total', () => {
    cy.get('.MoviesContainer')
    .children()
    .should('have.length', 4)
  })

  it('has correct details for the first poster', () => {
    const firstPoster = posters[0]

    cy.get('.MoviesContainer .MoviePoster:first')
      .within(() => {
        cy.get('img')
        .should('be.visible')
        .and('have.attr', 'src', firstPoster.poster_path)
        .and('have.attr', 'alt', `${firstPoster.title} poster`)

        cy.get('.VoteCount')
        .should('contain', firstPoster.vote_count)
      })
  })


  it('has correct details for the last poster', () => {
    const lastPoster = posters[3]

    cy.get('.MoviesContainer .MoviePoster:last')
      .within(() => {
        cy.get('img')
        .should('be.visible')
        .and('have.attr', 'src', lastPoster.poster_path)
        .and('have.attr', 'alt', `${lastPoster.title} poster`)

        cy.get('.VoteCount')
        .should('contain', lastPoster.vote_count)
      })
  })
})

describe('Voting Updates', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies', { statusCode: 200, body: posters })
    .as('fetchMovies')

    cy.visit('http://localhost:3000/')

    cy.wait('@fetchMovies')
  })

  it('correctly increments movie vote count when upvote button is clicked', () => {
    const firstPoster = posters[0]
    const firstPosterId = firstPoster.id
    let initialVotes

    cy.intercept('PATCH', `https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${firstPosterId}`, { statusCode: 200, body: firstPoster })
    .as('updateMovieVotes')

    cy.get('.MoviesContainer .MoviePoster:first .VoteCount')
    .invoke('text')
    .then((text) => [
      initialVotes = parseInt(text)
    ])

    cy.get('.MoviesContainer .MoviePoster:first .VoteButton:last').click()

    cy.wait('@updateMovieVotes')

    cy.get('.MoviesContainer .MoviePoster:first .VoteCount')
    .should('be.visible')
    .and(($el) => {
      const updatedVotes = parseInt($el.text())
      expect(updatedVotes).to.equal(initialVotes + 1)
    })   
  })

  it('correctly decrements movie vote count when downvote button is clicked', () => {
    const firstPoster = posters[0]
    const firstPosterId = firstPoster.id
    let initialVotes

    cy.intercept('PATCH', `https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${firstPosterId}`, { statusCode: 200, body: firstPoster })
    .as('updateMovieVotes')

    cy.get('.MoviesContainer .MoviePoster:first .VoteCount')
    .invoke('text')
    .then((text) => [
      initialVotes = parseInt(text)
    ])

    cy.get('.MoviesContainer .MoviePoster:first .VoteButton:first').click()

    cy.wait('@updateMovieVotes')

    cy.get('.MoviesContainer .MoviePoster:first .VoteCount')
    .should('be.visible')
    .and(($el) => {
      const updatedVotes = parseInt($el.text())
      expect(updatedVotes).to.equal(initialVotes - 1)
    }) 
  })

})