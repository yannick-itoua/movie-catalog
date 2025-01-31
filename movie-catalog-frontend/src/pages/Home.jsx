import React, { useState, useEffect } from "react";
import { fetchMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const { movies, totalPages } = await fetchMovies(searchTerm, currentPage);
      setMovies(movies);
      setTotalPages(totalPages);
      setLoading(false);
    };
    loadMovies();
  }, [searchTerm, currentPage]); // 🔄 Met à jour la liste en fonction de la recherche et de la page

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <>
          <div className="movies-grid">
            {movies.length > 0 ? (
              movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
              <p>No movies found</p>
            )}
          </div>

          {/* 🔄 Boutons de Pagination */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                padding: "10px 20px",
                margin: "0 10px",
                backgroundColor: currentPage === 1 ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              ◀ Previous
            </button>

            <span style={{ fontSize: "18px", alignSelf: "center" }}>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{
                padding: "10px 20px",
                margin: "0 10px",
                backgroundColor: currentPage === totalPages ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
