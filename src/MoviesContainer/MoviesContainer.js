import './MoviesContainer.css';
import MoviePoster from "../MoviePoster/MoviePoster";

function MoviesContainer({ movies, onAddVote, onSubtractVote, onPosterClick }) {

  return (
      <section className='MoviesContainer'>
        {movies.map(movie => (
          <MoviePoster
          key={movie.id}
          movie={movie}
          onPosterClick={() => onPosterClick(movie)}
          onAddVote={onAddVote}
          onSubtractVote={onSubtractVote}
          />
        ))}
      </section>
  );
}

export default MoviesContainer;