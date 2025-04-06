import './App.css';
import searchIcon from '../icons/search.png';

// Example imports (for later):
// import { useState, useEffect } from 'react';
import moviePosters from '../data/movie_posters';
import movieDetails from '../data/movie_details';
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

// Need to build the function to change the displays here 
//  because we are changing state.
// Then we have the eventlistener in the MoviePoster.js

function displayMovieDetails(event) {
  event.preventDefault();
  const section = event.target.closest("section")
  show([moviePosterData])
  hide([movieContainer])
}

// Helper Functions
function show(elements) {
  elements.forEach(element => {
    element.classList.remove("hidden")
  })
}

function hide(elements) {
  elements.forEach(element => {
    element.classList.add(hidden)
  })
}

export default App;
