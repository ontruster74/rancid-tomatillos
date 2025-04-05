import './MoviePoster.css';

function MoviePoster({ id, title, poster, votes, onAddVote, onSubtractVote }) {
  return (
    <section className='MoviePoster'>
      <img src={poster} alt={`${title} poster`} />
      <h2>{title}</h2>
      <div className='VoteFooter'>
        <button className="VoteButton" onClick={() => onSubtractVote(id)}>-</button>
        <span className="VoteCount">{votes}</span>
        <button className="VoteButton" onClick={() => onAddVote(id)}>+</button>
      </div>
    </section>
  );
}

export default MoviePoster;