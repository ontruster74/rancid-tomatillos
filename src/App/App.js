import './App.css';
import searchIcon from '../icons/search.png';

// Example imports (for later):
import { useState, useEffect } from 'react';
import moviePosters from '../data/movie_posters';
import movieDetails from '../data/movie_details';
import MoviesContainer from '../MoviesContainer/MoviesContainer';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(moviePosters);
  }, [])

  const addVote = (movieId) => {
    setMovies(movies.map((movie) => 
        (movie.id === movieId) ? { ...movie, vote_count: movie.vote_count + 1 } : movie
      )
    )
  }

  const subtractVote = (movieId) => {
    setMovies(movies.map((movie) => 
        (movie.id === movieId) ? { ...movie, vote_count: movie.vote_count - 1 } : movie
      )
    )
  }

  return (
    <main className='App'>
      <header>
        <h1>rancid tomatillos</h1>
      </header>

      <MoviesContainer movies={movies} onAddVote={addVote} onSubtractVote={subtractVote}/>
    </main>
  );
}

export default App;

