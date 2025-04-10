import './MoviesContainer.css';
import MoviePoster from "../MoviePoster/MoviePoster";
import { useNavigate } from 'react-router-dom';

function MoviesContainer({ movies, onAddVote, onSubtractVote, onPosterClick }) {
  const navigate = useNavigate()

  return (
      <section className='MoviesContainer'>
        {movies.map(movie => (
          <MoviePoster
          key={movie.id}
          movie={movie}
          onPosterClick={() => navigate('/movies/${movie.id}')}
          onAddVote={onAddVote}
          onSubtractVote={onSubtractVote}
          />
        ))}
      </section>
  );
}

export default MoviesContainer;