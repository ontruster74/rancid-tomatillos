import './MoviePoster.css';

function MoviePoster({ title, poster, votes, onPosterClick }) {
  return (
    <section className='MoviePoster' onClick={onPosterClick}>
      <img src={poster} alt={`${title} poster`} />
      {/* <h2>{title}</h2> */}
      <p>{votes}</p>
    </section>
  );
}



export default MoviePoster;