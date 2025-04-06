import './MoviesContainer.css';
import MoviePoster from "../MoviePoster/MoviePoster";
// import "./MoviesContainer.css";
import moviePosters from "../data/movie_posters"


function MoviesContainer({ onPosterClick }) {
  return (
      <section className='MoviesContainer'>
        {moviePosters.map(movie => (
          <MoviePoster
          key={movie.id}
          title={movie.title}
          poster={movie.poster_path}
          votes={movie.vote_count}
          onPosterClick={() => onPosterClick(movie)}
          />
        ))}
      </section>
  );
}
  
export default MoviesContainer;