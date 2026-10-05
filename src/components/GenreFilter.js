const genres = ["All genres", "Action", "Animation", "Comedy", "Drama", "Romance", "Sci-Fi"];

export default function GenreFilter({ genre, onGenreChange }) {
  return (
    <label className="field" htmlFor="genre-filter">
      Genre
      <select id="genre-filter" value={genre} onChange={(event) => onGenreChange(event.target.value)}>
        {genres.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
  );
}
