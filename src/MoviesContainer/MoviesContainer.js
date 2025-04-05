import './MoviesContainer.css';
import MoviePoster from "../MoviePoster/MoviePoster";
import "./MoviesContainer.css";
import moviePosters from "../data/movie_posters"


function MoviesContainer() {
  return (
      <section className='MoviesContainer'>
        {moviePosters.map(movie => (
          <MoviePoster
          key={movie.id}
          title={movie.title}
          poster={movie.poster_path}
          votes={movie.vote_count}
          />
        ))}
      </section>
  );
}
  
export default MoviesContainer;