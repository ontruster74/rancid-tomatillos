import './MoviesContainer.css';
import MoviePoster from "../MoviePoster/MoviePoster";

function MoviesContainer({ movies, onAddVote, onSubtractVote }) {
  return (
      <section className='MoviesContainer'>
        {movies.map(movie => (
          <MoviePoster
          key={movie.id}
          movie={movie}
          onAddVote={onAddVote}
          onSubtractVote={onSubtractVote}
          />
        ))}
      </section>
  );
}

export default MoviesContainer;