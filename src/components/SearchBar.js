import { useRef } from "react";

export default function SearchBar({ search, onSearchChange }) {
  const searchInputRef = useRef(null);
  function clearSearch() {
    onSearchChange("");
    searchInputRef.current.focus();
  }
  return (
    <div className="field search-field">
      <label htmlFor="movie-search">Tìm tên phim</label>
      <div className="search-controls">
        <input id="movie-search" ref={searchInputRef} type="search" placeholder="Nhập tiêu đề phim" value={search} onChange={(event) => onSearchChange(event.target.value)} />
        <button type="button" onClick={clearSearch}>Xóa</button>
      </div>
    </div>
  );
}
