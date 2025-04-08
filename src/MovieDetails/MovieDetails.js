import './MovieDetails.css';
import movieDetails from '../data/movie_details';
import { useState, useEffect } from 'react';


function MovieDetails({ movie }) {
  const [movieDetails, setMovieDetails] = useState(null);

  
  return (
    <section className='MovieDetails'>
      <img src={movie.backdrop_path} alt={`${movieDetails.title} poster`}/>
      <h2 className='movie-title'>{movie.title}</h2>
      <div className="genre-container">
        {movie.genre_ids.map((genre, index) => (
          <div key={index} className="genre-tag">{genre}</div>
        ))}
      </div>
      <p className="movie-overview">{movie.overview}</p>
    </section>
  );
}

export default MovieDetails;