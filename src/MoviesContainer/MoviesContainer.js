import './MoviesContainer.css';
import MoviePoster from "../MoviePoster/MoviePoster";
import { useNavigate } from 'react-router-dom';

function MoviesContainer({ movies, onAddVote, onSubtractVote }) {
  const navigate = useNavigate()

  const handlePosterClick = (movieId) => {
    navigate(`/movies/${movieId}`)
  }

  return (
      <section className='MoviesContainer'>
        {movies.map(movie => (
          <MoviePoster
          key={movie.id}
          movie={movie}
          onClick={() => handlePosterClick(movie.id)}
          onAddVote={onAddVote}
          onSubtractVote={onSubtractVote}
          />
        ))}
      </section>
  );
}

export default MoviesContainer;