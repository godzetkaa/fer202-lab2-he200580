export default function MovieItem({ movie, isFavorite, onToggleFavorite, onViewDetail }) {
  return (
    <li className="movie-item">
      <button
        className="favorite-star"
        type="button"
        aria-label={`Favorite ${movie.title}`}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(movie.id)}
      >
        {isFavorite ? "\u2605" : "\u2606"}
      </button>
      <h2>
        <button className="movie-title" type="button" aria-label="View detail" title="View detail" onClick={() => onViewDetail(movie)}>
          {movie.title}
        </button>
      </h2>
      <span>{movie.genre}</span>
      <span>{movie.year}</span>
      <span>{movie.rating.toFixed(1)} / 10</span>
    </li>
  );
}
