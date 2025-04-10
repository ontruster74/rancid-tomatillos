import './MovieDetails.css';
import homeIcon from '../icons/home.png'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

function MovieDetails() {
  const navigate = useNavigate()

  const { id } = useParams()
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${id}`)
    .then(response => response.json())
    .then(data => setMovieDetails(data))
    .catch(error => console.error("There was an error fetching movie details:", error));
  }, [id]);

  if (!movieDetails) {
    return <p>No details found for this movie</p>
  }

  return (
    <section className='MovieDetails'>
      <div>
          <button className="homeButton" onClick={() => navigate('/')}><img src={homeIcon} alt="Home Button" /></button>
      </div>
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