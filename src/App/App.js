import './App.css';
// import searchIcon from '../icons/search.png';
import homeIcon from '../icons/home.png'

// Example imports (for later):
import { useState, useEffect } from 'react';
// import moviePosters from '../data/movie_posters';
// import movieDetails from '../data/movie_details';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import { fetchMovies, updateMovieVotes } from '../utilities/api';
import MovieDetails from '../MovieDetails/MovieDetails';

function App() {
  const [chosenMovie, setChosenMovie] = useState(null)

  function handlePosterClick(movie) {
    setChosenMovie(movie)
  }
  
  function goHome() {
    setChosenMovie(null);
  }
  
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    fetchMovies()
    .then((movieData) => {setMovies(movieData)})
    .catch((error) => {console.error('Something went wrong while fetching movie data:', error)})
  }, [])
  
  const addVote = (movieId) => {
    updateMovieVotes(movieId, 'up')
    .then(setMovies(movies.map((movie) => 
      (movie.id === movieId) ? { ...movie, vote_count: movie.vote_count + 1 } : movie
  )
))
}

const subtractVote = (movieId) => {
  updateMovieVotes(movieId, 'down')
  .then(setMovies(movies.map((movie) => 
    (movie.id === movieId) ? { ...movie, vote_count: movie.vote_count - 1 } : movie
)
))
}

return (
  <main className='App'>
      <header>
        <h1>rancid tomatillos</h1>
        <div></div>
        {chosenMovie && (<button className="homeButton" onClick={goHome}><img src={homeIcon} alt="Home Button" /></button>)}
      </header>
      {chosenMovie ? ( 
        <MovieDetails movie={chosenMovie} goHome={goHome} /> 
      ) : ( 
        <MoviesContainer 
        movies={movies} 
        onAddVote={addVote} 
        onSubtractVote={subtractVote}
        onPosterClick={handlePosterClick} 
        />
      )}
    </main>
  );
}

export default App;
