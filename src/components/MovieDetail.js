export default function MovieDetail({ movie, onClose }) {
  return (
    <section className="movie-detail" id={`movie-detail-${movie.id}`} aria-label={`Details for ${movie.title}`}>
      <h2>{movie.title}</h2>
      <p>{movie.genre} | {movie.year} | {movie.rating.toFixed(1)} / 10</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Duration:</strong> {movie.duration} minutes</p>
      <p>{movie.description}</p>
      <button type="button" onClick={onClose}>Close detail</button>
    </section>
  );
}
