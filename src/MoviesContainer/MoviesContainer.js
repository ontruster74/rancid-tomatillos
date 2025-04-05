import './MoviesContainer.css';
import MoviePoster from "../MoviePoster/MoviePoster";

function MoviesContainer({ movies, onAddVote, onSubtractVote }) {
  return (
      <section className='MoviesContainer'>
        {movies.map(movie => (
          <MoviePoster
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster={movie.poster_path}
          votes={movie.vote_count}
          onAddVote={onAddVote}
          onSubtractVote={onSubtractVote}
          />
        ))}
      </section>
  );
}
 
export default MoviesContainer;