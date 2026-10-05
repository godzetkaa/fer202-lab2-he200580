import MovieItem from "./MovieItem";

export default function MovieList({ movies, favorites, onToggleFavorite, onViewDetail }) {
  if (movies.length === 0) {
    return <p className="empty-state">No movies match your search and genre.</p>;
  }
  return (
    <ul className="movie-list" aria-label="Movies">
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} isFavorite={favorites.includes(movie.id)} onToggleFavorite={onToggleFavorite} onViewDetail={onViewDetail} />
      ))}
    </ul>
  );
}
