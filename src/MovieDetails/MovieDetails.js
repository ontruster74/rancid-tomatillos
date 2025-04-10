import './MovieDetails.css';
// import movieDetails from '../data/movie_details';
import { useState, useEffect } from 'react';

function MovieDetails({ movie }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${movie.id}`)
    .then(response => response.json())
    .then(data => setMovieDetails(data))
    .catch(error => {
      console.error("There was an error fetching movie details:", error);
      setError(true);
    });
  }, [movie.id]);

  if (error){
    return <p className-="error-message">Oh No! There was an error fetching movie details</p>
  }

  if (!movieDetails) {
    return <p>No details found for this movie</p>
  }

  return (
    <section className='MovieDetails'>
      <img src={movieDetails.backdrop_path} alt={`${movieDetails.title} poster`}/>
      <h2 className='movie-title'>{movieDetails.title}</h2>
      <div className="genre-container">
        {movieDetails.genre_ids.map((genre, index) => (
          <div key={index} className="genre-tag">{genre}</div>
        ))}
      </div>
      <p className="movie-overview">{movieDetails.overview}</p>
    </section>
  );
}

export default MovieDetails;