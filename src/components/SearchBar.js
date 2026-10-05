import { useRef } from "react";

export default function SearchBar({ search, onSearchChange }) {
  const searchInputRef = useRef(null);
  function clearSearch() {
    onSearchChange("");
    searchInputRef.current.focus();
  }
  return (
    <div className="field search-field">
      <label htmlFor="movie-search">Search by title</label>
      <div className="search-controls">
        <input id="movie-search" ref={searchInputRef} type="search" placeholder="Enter a movie title" value={search} onChange={(event) => onSearchChange(event.target.value)} />
        <button type="button" onClick={clearSearch}>Clear</button>
      </div>
    </div>
  );
}
