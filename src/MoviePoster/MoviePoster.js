import './MoviePoster.css';
import upVoteIcon from '../icons/upvote.png'
import downVoteIcon from '../icons/downvote.png'
import { useNavigate } from 'react-router-dom';

function MoviePoster({ movie, onAddVote, onSubtractVote }) {
  const { id, title, poster_path, vote_count } = movie;
  const navigate = useNavigate()

  return (
    <section className='MoviePoster' >
      <img src={poster_path} alt={`${title} poster`} onClick={navigate(`/movies/${movie.id}`)} />
      <div className='VoteFooter'>
        <button className="VoteButton" onClick={() => onSubtractVote(id)}><img src={downVoteIcon} alt="Dislike Button" /></button>
        <p className="VoteCount">{vote_count}</p>
        <button className="VoteButton" onClick={() => onAddVote(id)}><img src={upVoteIcon} alt="Like Button" /></button>
      </div>
    </section>
  );
}



export default MoviePoster;