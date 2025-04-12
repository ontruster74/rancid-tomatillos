import './App.css';
import homeIcon from '../icons/home.png'
import { useState, useEffect } from 'react';
import { fetchMovies, updateMovieVotes } from '../utilities/api';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MovieDetails from '../MovieDetails/MovieDetails';

function App() { 
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
    )))
  }

  const subtractVote = (movieId) => {
    updateMovieVotes(movieId, 'down')
    .then(setMovies(movies.map((movie) => 
      (movie.id === movieId) ? { ...movie, vote_count: movie.vote_count - 1 } : movie
    )))
  }

  function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    
    const showHomeButton = location.pathname !=='/'

    return (
      <header>
        <h1>rancid tomatillos</h1>
        <div></div>
        { showHomeButton && (<button className="homeButton" onClick={() => navigate('/')}><img src={homeIcon} alt="Home Button" /></button>)}
      </header>
    )
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
        </Routes>
      </Router>
    </main>
  );
}

export default App;
