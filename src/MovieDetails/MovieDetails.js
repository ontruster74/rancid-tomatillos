import './MovieDetails.css';
// import MoviePoster from '../MoviePoster/MoviePoster';
import moviePosters from '../data/movie_posters';
import movieDetails from '../data/movie_details';


function MovieDetails() {
  return (
    <section className='MovieDetails'>
      <img src={poster} alt={`${title} poster`}/>
      <h2>{title}</h2>
      <p></p>
    </section>
  );
}

export default MovieDetails;