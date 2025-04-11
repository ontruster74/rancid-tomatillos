import './MovieDetails.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
          const response = await fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${id}`)
          const data = await response.json()
          setMovie(data)
      } catch(error) {
         console.error("There was an error fetching movie details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id]);

  if (!movie) {
    return <p>No details found for this movie: {id}</p>
  }

  return (
    <section className='MovieDetails'>
      <img src={movie.backdrop_path} alt={`${movie.title} poster`}/>
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