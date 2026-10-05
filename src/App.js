import { useContext, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import GenreFilter from "./components/GenreFilter";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import { movies } from "./data/movies";
import useLocalStorage from "./hooks/useLocalStorage";

function MovieManager() {
  const { darkMode } = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All genres");
  const [sort, setSort] = useState("default");
  const [favorites, setFavorites] = useLocalStorage(
    "movie-favorites",
    [],
    (value) => Array.isArray(value) &&
      value.every((id) => movies.some((movie) => movie.id === id)) &&
      new Set(value).size === value.length
  );
  const [selectedMovie, setSelectedMovie] = useState(null);

  const visibleMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.trim().toLowerCase()) &&
    (genre === "All genres" || movie.genre === genre)
  );
  if (sort !== "default") {
    visibleMovies.sort((a, b) =>
      sort === "descending" ? b.rating - a.rating : a.rating - b.rating
    );
  }

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id)
      ? current.filter((favoriteId) => favoriteId !== id)
      : [...current, id]);
  }

  return (
    <main className={`app ${darkMode ? "dark" : "light"}`}>
      <div className={`manager-layout ${selectedMovie ? "has-detail" : ""}`}>
      <div className="manager-panel">
        <Header />
        <section className="filters" aria-label="Movie filters">
          <SearchBar search={search} onSearchChange={setSearch} />
          <GenreFilter genre={genre} onGenreChange={setGenre} />
          <label className="field" htmlFor="rating-sort">
            Sort by rating
            <select id="rating-sort" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="default">Default</option>
              <option value="descending">High → Low</option>
              <option value="ascending">Low → High</option>
            </select>
          </label>
        </section>
        <p role="status">Tổng: {movies.length} | Yêu thích: {favorites.length} | Đang hiển thị: {visibleMovies.length}</p>
        <MovieList movies={visibleMovies} favorites={favorites} onToggleFavorite={toggleFavorite} onViewDetail={setSelectedMovie} selectedMovie={selectedMovie} />
      </div>
      {selectedMovie && <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
      </div>
    </main>
  );
}

export default function App() {
  return <ThemeProvider><MovieManager /></ThemeProvider>;
}
