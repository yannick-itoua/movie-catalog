import React, { useState } from "react";

const SearchBar = ({ setSearchTerm }) => {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(input.trim());
  };

  return (
    <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search movies..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "300px",
          marginRight: "10px",
        }}
      />
      <button type="submit" style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
