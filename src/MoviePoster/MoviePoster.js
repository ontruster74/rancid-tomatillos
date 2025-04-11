import './MoviePoster.css';
import upVoteIcon from '../icons/upvote.png'
import downVoteIcon from '../icons/downvote.png'

function MoviePoster({ movie, onClick, onAddVote, onSubtractVote }) {

  return (
    <section className='MoviePoster' >
      <img src={movie.poster_path} alt={`${movie.title} poster`} onClick={onClick} />
      <div className='VoteFooter'>
        <button className="VoteButton" onClick={() => onSubtractVote(movie.id)}><img src={downVoteIcon} alt="Dislike Button" /></button>
        <p className="VoteCount">{movie.vote_count}</p>
        <button className="VoteButton" onClick={() => onAddVote(movie.id)}><img src={upVoteIcon} alt="Like Button" /></button>
      </div>
    </section>
  );
}

export default MoviePoster;