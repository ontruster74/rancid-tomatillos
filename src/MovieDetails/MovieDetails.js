import './MovieDetails.css';
// import movieDetails from '../data/movie_details';
import { useState, useEffect } from 'react';


function MovieDetails({ movie }) {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com//api/v1/movies/${movie.id}`)
    .then(response => response.json())
    .then(data => {console.log("API response:", data); setMovieDetails(data.movie)})
    .catch(error => console.error("There was an error fetching movie details:", error));
  }, [movie.id]);

  if (!movieDetails) {
    return <p>No details found for this movie</p>
  }

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