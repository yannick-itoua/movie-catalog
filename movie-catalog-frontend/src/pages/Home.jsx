import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editingMovie, setEditingMovie] = useState(null);
  const [newMovie, setNewMovie] = useState(null); // Stocke le film en cours d'ajout

  const fetchMovies = async (page = 1, search = '') => {
    try {
      setLoading(true);
      
      // Construire l'URL avec la recherche (sans espace en trop)
      let url = `http://localhost:5000/api/movies?page=${page}`;
      if (search.trim() !== '') {
        url += `&search=${encodeURIComponent(search)}`;
      }
  
      const { data } = await axios.get(url);
      
      console.log("🔎 Movies received from API:", data);
      
      if (data && Array.isArray(data)) {
        setMovies(data);
      } else if (data && data.movies) {
        setMovies(data.movies);
        setTotalPages(data.totalPages);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/movies`, newMovie);
      setNewMovie(null); // Ferme le formulaire après l'ajout
      fetchMovies(currentPage, searchTerm);
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/movies/${editingMovie._id}`, editingMovie);
      setEditingMovie(null);
      fetchMovies(currentPage, searchTerm);
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const deleteMovie = async (id) => {
    if (!id) {
      console.error("No ID provided for deletion.");
      return;
    }
  
    try {
      console.log("Deleting movie with ID:", id);
      const response = await axios.delete(`http://localhost:5000/api/movies/${id}`);
      //alert(response.data.message); // Affiche "Movie deleted successfully"
      fetchMovies(currentPage, searchTerm);
    } catch (error) {
      console.error("Error deleting movie:", error.response ? error.response.data : error.message);
      alert("Failed to delete movie: " + (error.response ? error.response.data.message : error.message));
    }
  };
  
  
  

  useEffect(() => {
    fetchMovies(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      
      <button
        onClick={() => setNewMovie({ title: '', genre: '', year: '', description: '' })}
        style={{ marginBottom: '20px' }}
      >
        Add Movie
      </button>

      {/* Formulaire pour ajouter un film */}
      {newMovie && (
        <form onSubmit={handleAddMovie} style={{ marginBottom: '20px', padding: '20px', border: '1px solid black' }}>
          <h3>Add New Movie</h3>
          <input
            type="text"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            placeholder="Title"
            required
          />
          <input
            type="text"
            value={newMovie.genre}
            onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
            placeholder="Genre"
            required
          />
          <input
            type="number"
            value={newMovie.year}
            onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
            placeholder="Year"
            required
          />
          <input
            type="text"
            value={newMovie.description}
            onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
            placeholder="Description"
            required
          />
          <button type="submit">Add Movie</button>
          <button type="button" onClick={() => setNewMovie(null)}>Cancel</button>
        </form>
      )}

      {/* Formulaire pour modifier un film */}
      {editingMovie && (
        <form onSubmit={handleUpdateMovie} style={{ marginBottom: '20px', padding: '20px', border: '1px solid black' }}>
          <h3>Update Movie</h3>
          <input
            type="text"
            value={editingMovie.title}
            onChange={(e) => setEditingMovie({ ...editingMovie, title: e.target.value })}
            placeholder="Title"
            required
          />
          <input
            type="text"
            value={editingMovie.genre}
            onChange={(e) => setEditingMovie({ ...editingMovie, genre: e.target.value })}
            placeholder="Genre"
            required
          />
          <input
            type="number"
            value={editingMovie.year}
            onChange={(e) => setEditingMovie({ ...editingMovie, year: e.target.value })}
            placeholder="Year"
            required
          />
          <input
            type="text"
            value={editingMovie.description}
            onChange={(e) => setEditingMovie({ ...editingMovie, description: e.target.value })}
            placeholder="Description"
            required
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditingMovie(null)}>Cancel</button>
        </form>
      )}

      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="movies-grid">
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onUpdate={() => setEditingMovie(movie)}
                onDelete={() => deleteMovie(movie._id)}
              />
            ))
          ) : (
            <p>No movies found</p>
          )}
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;
