import './MoviePoster.css';

function MoviePoster({ title, poster, votes }) {
  return (
    <section className='MoviePoster'>
      <img src={poster} alt={`${title} poster`} />
      <h2>{title}</h2>
      <p>Votes: {votes}</p>
    </section>
  );
}

export default MoviePoster;