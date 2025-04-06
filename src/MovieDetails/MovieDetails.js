import './MovieDetails.css';
import movieDetails from '../data/movie_details';


function MovieDetails({ movie, goHome }) {
  return (
    <section className='MovieDetails'>
      <button onClick={goHome}>Home</button>
      <img src={movie.backdrop_path} alt={`${movieDetails.title} poster`}/>
      <h2>{movie.title}</h2>
      <div className="genre-container">
        {movie.genre_ids.map((genre, index) => (
          <div key={index}>{genre}</div>
        ))}
      </div>
      <p>{movie.overview}</p>
    </section>
  );
}

export default MovieDetails;