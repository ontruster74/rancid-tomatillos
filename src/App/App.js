import './App.css';
import searchIcon from '../icons/search.png';

// Example imports (for later):
// import { useState, useEffect } from 'react';
// import moviePosters from '../data/movie_posters';
// import movieDetails from '../data/movie_details';
import MoviesContainer from '../MoviesContainer/MoviesContainer';

function App() {
  return (
    <main className='App'>
      <header>
        <h1>rancid tomatillos</h1>
        <div></div>
      </header>
      <MoviesContainer/>
    </main>
  );
}

export default App;
