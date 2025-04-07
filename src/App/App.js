import './App.css';
import searchIcon from '../icons/search.png';
import homeIcon from '../icons/home.png'

// Example imports (for later):
import { useState, useEffect } from 'react';
import moviePosters from '../data/movie_posters';
import movieDetails from '../data/movie_details';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MovieDetails from '../MovieDetails/MovieDetails';

function App() {
  const [chosenMovie, setChosenMovie] = useState(null)

  function handlePosterClick(movie) {
    setChosenMovie(movie)
  }

  function goHome() {
    setChosenMovie(null);
  }

  return (
    <main className='App'>
      <header>
        <h1>rancid tomatillos</h1>
        <div></div>
        {chosenMovie && (<button class="homeButton" onClick={goHome}><img src={homeIcon} alt="Home Button" /></button>)}
      </header>
      {chosenMovie ? ( <MovieDetails movie={movieDetails} goHome={goHome} /> ) : ( <MoviesContainer onPosterClick={handlePosterClick} />)}
    </main>
  );
}

export default App;
