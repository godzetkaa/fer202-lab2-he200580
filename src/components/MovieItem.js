export default function MovieItem({ movie, isFavorite, onToggleFavorite, onViewDetail, isDetailOpen }) {
  return (
    <li className="movie-item">
      <div className="movie-row">
        <span className={`favorite-star ${isFavorite ? "is-favorite" : ""}`} role="img" aria-label={isFavorite ? "Favorite movie" : "Not favorite"}>
          {"\u2605"}
        </span>
        <h2>
          <button className="movie-title" type="button" aria-expanded={isDetailOpen} aria-controls={isDetailOpen ? `movie-detail-${movie.id}` : undefined} onClick={() => onViewDetail(movie)}>
            {movie.title}
          </button>
        </h2>
        <span>{movie.genre}</span>
        <span>{movie.year}</span>
        <span>{movie.rating.toFixed(1)} / 10</span>
      </div>
      <div className="movie-actions">
        <button type="button" aria-pressed={isFavorite} onClick={() => onToggleFavorite(movie.id)}>Yêu thích</button>
        <button type="button" aria-expanded={isDetailOpen} aria-controls={isDetailOpen ? `movie-detail-${movie.id}` : undefined} onClick={() => onViewDetail(movie)}>Chi tiết</button>
      </div>
    </li>
  );
}
