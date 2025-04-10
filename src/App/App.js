import './App.css';
// import searchIcon from '../icons/search.png';

import { useState, useEffect } from 'react';
import { fetchMovies, updateMovieVotes } from '../utilities/api';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MovieDetails from '../MovieDetails/MovieDetails';

function App() {
  /*
  const [chosenMovie, setChosenMovie] = useState(null)

  function handlePosterClick(movie) {
    setChosenMovie(movie)
  }
  
  function goHome() {
    setChosenMovie(null);
  }
  */
  
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
      </header>
      <Router>
        <Routes>
          <Route path="/"
          element={<MoviesContainer 
            movies={movies} 
            onAddVote={addVote} 
            onSubtractVote={subtractVote}
            />} />
          <Route path="/movies/:id"
          element={<MovieDetails />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;

/*
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
*/


