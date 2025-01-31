import React from 'react';

const MovieCard = ({ movie, onUpdate, onDelete }) => {
  return (
    <div
      style={{
        border: '1px solid black',
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h3>{movie.title}</h3>
      <p>Genre: {movie.genre}</p>
      <p>Year: {movie.year}</p>
      <p>{movie.description}</p>
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={onUpdate}
          style={{
            marginRight: '10px',
            padding: '5px 10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Update
        </button>
        <button
          onClick={onDelete}
          style={{
            padding: '5px 10px',
            backgroundColor: '#ff4d4d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
