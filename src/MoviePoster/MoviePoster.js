import './MoviePoster.css';
import upVoteIcon from '../icons/upvote.png'
import downVoteIcon from '../icons/downvote.png'

function MoviePoster({ id, title, poster, votes, onPosterClick, onAddVote, onSubtractVote }) {
  return (
    <section className='MoviePoster' >
      <img src={poster} alt={`${title} poster`} onClick={onPosterClick} />
      {/* <h2>{title}</h2> */}
      <div className='VoteFooter'>
        <button className="VoteButton" onClick={() => onSubtractVote(id)}><img src={downVoteIcon} alt="Dislike Button" /></button>
        <p className="VoteCount">{votes}</p>
        <button className="VoteButton" onClick={() => onAddVote(id)}><img src={upVoteIcon} alt="Like Button" /></button>
      </div>
    </section>
  );
}



export default MoviePoster;