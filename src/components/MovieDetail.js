import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";

export default function MovieDetail({ movie, onClose }) {
  const { darkMode } = useContext(ThemeContext);
  return (
    <Modal show={Boolean(movie)} onHide={onClose} aria-labelledby="movie-detail-title" data-bs-theme={darkMode ? "dark" : "light"} centered>
      {movie && <>
        <Modal.Header closeButton>
          <Modal.Title id="movie-detail-title">{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{movie.genre} · {movie.year} · {movie.rating.toFixed(1)} / 10</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Duration:</strong> {movie.duration} minutes</p>
          <p>{movie.description}</p>
        </Modal.Body>
        <Modal.Footer><button type="button" className="btn btn-secondary" onClick={onClose}>Close detail</button></Modal.Footer>
      </>}
    </Modal>
  );
}
