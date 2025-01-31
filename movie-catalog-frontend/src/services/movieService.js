import axios from "axios";

const API_KEY = "a48b098acff98f3446e512b58dd2a85a"; // 🔥 Remplace par ta clé API TMDb
const BASE_URL = "https://api.themoviedb.org/3";

// 🔍 Récupère les films populaires ou effectue une recherche avec pagination
export const fetchMovies = async (search = "", page = 1) => {
  try {
    const url = search
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(search)}&page=${page}`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;

    const { data } = await axios.get(url);
    
    console.log("🎬 Films reçus de TMDb:", data.results);
    return { movies: data.results, totalPages: data.total_pages }; // 🔥 Retourne aussi le nombre total de pages
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des films:", error);
    return { movies: [], totalPages: 1 };
  }
};

// 📄 Récupère les détails d'un film spécifique
export const fetchMovieDetails = async (movieId) => {
  try {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des détails du film:", error);
    return null;
  }
};
