import './App.css';

import Header from '../Header/Header'
import NotFound from '../NotFound/NotFound'
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MovieDetails from '../MovieDetails/MovieDetails';

import { useState, useEffect } from 'react';
import { fetchMovies, updateMovieVotes } from '../utilities/api';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() { 
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setLoading(true)
    fetchMovies()
    .then((movieData) => {setMovies(movieData)})
    .catch((error) => {console.error('Something went wrong while fetching movie data:', error)})
    .finally(setLoading(false))
  }, [])
  
  if (loading) {
    return <p>Loading movies...</p>
  }

  const addVote = (movieId) => {
    updateMovieVotes(movieId, 'up')
    .then(setMovies(movies.map((movie) => 
      (movie.id === movieId) ? { ...movie, vote_count: movie.vote_count + 1 } : movie
    )))
  }

  const subtractVote = (movieId) => {
    updateMovieVotes(movieId, 'down')
    .then(setMovies(movies.map((movie) => 
      (movie.id === movieId) ? { ...movie, vote_count: movie.vote_count - 1 } : movie
    )))
  }

  return (
    <main className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path="/"
          element={<MoviesContainer 
            movies={movies} 
            onAddVote={addVote} 
            onSubtractVote={subtractVote}
            />} />
          <Route path="/movies/:id"
          element={<MovieDetails />} />
          <Route path="*"
          element={<NotFound />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
