import './MoviePoster.css';
import upVoteIcon from '../icons/upvote.png'
import downVoteIcon from '../icons/downvote.png'
import { Link } from 'react-router-dom'

function MoviePoster({ movie, onAddVote, onSubtractVote }) {
  return (
    <section className='MoviePoster' >
      <Link to={`/movies/${movie.id}`}>
        <img src={movie.poster_path} alt={`${movie.title} poster`} />
      </Link>
      <div className='VoteFooter'>
        <button className="VoteButton" onClick={() => onSubtractVote(movie.id)}><img src={downVoteIcon} alt="Dislike Button" /></button>
        <p className="VoteCount">{movie.vote_count}</p>
        <button className="VoteButton" onClick={() => onAddVote(movie.id)}><img src={upVoteIcon} alt="Like Button" /></button>
      </div>
    </section>
  );
}

export default MoviePoster;