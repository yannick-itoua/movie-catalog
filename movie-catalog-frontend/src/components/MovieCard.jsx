import React from "react";

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=No+Image";

  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
      <img src={imageUrl} alt={movie.title} style={{ width: "100%", borderRadius: "5px" }} />
      <h3>{movie.title}</h3>
      <p>📅 {movie.release_date}</p>
      <p>⭐ {movie.vote_average}/10</p>
    </div>
  );
};

export default MovieCard;
