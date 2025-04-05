import './MoviePoster.css';

function MoviePoster({ id, title, poster, votes, onAddVote, onSubtractVote }) {
  return (
    <section className='MoviePoster'>
      <img src={poster} alt={`${title} poster`} />
      <h2>{title}</h2>
      <p>
        <button onClick={() => onSubtractVote(id)}>-</button>
        &nbsp;{votes}&nbsp;
        <button onClick={() => onAddVote(id)}>+</button>
      </p>
    </section>
  );
}

export default MoviePoster;