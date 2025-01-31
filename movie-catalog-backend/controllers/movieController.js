const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const asyncHandler = require("../utils/asyncHandler");

// @desc Get all movies
// @route GET /api/movies
const getMovies = asyncHandler(async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    // Appliquer la recherche si un titre est fourni
    if (search) {
      query.title = { $regex: new RegExp(`^${search}`, "i") }; // Recherche insensible à la casse (titres commençant par)
    }

    // Récupérer les films en fonction du filtre
    const movies = await Movie.find(query);
    
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// @desc Add a new movie
// @route POST /api/movies
const addMovie = asyncHandler(async (req, res) => {
  const { title, genre, year, description } = req.body;
  const movie = await Movie.create({ title, genre, year, description });
  res.status(201).json(movie);
});

// @desc Update a movie
// @route PUT /api/movies/:id
const updateMovie = asyncHandler(async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    Object.assign(movie, req.body);
    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc Delete a movie
// @route DELETE /api/movies/:id
const deleteMovie = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid Movie ID:", id);
      return res.status(400).json({ message: "Invalid movie ID" });
    }

    // Vérifier si le film existe
    const movie = await Movie.findById(id);
    if (!movie) {
      console.error("Movie not found:", id);
      return res.status(404).json({ message: "Movie not found" });
    }

    // Suppression du film
    await Movie.deleteOne({ _id: id });

    console.log("Movie deleted successfully:", id);
    res.json({ message: "Movie deleted successfully" });

  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// @desc Add multiple movies
// @route POST /api/movies/bulk
const addMultipleMovies = asyncHandler(async (req, res) => {
  const movies = [
    {
      title: "Inception",
      genre: "Sci-Fi",
      year: 2010,
      description: "A mind-bending thriller",
      favorite: false,
    },
    {
      title: "Titanic",
      genre: "Drama",
      year: 1997,
      description: "A tragic love story",
      favorite: false,
    },
    {
      title: "The Dark Knight",
      genre: "Action",
      year: 2008,
      description: "A gritty superhero movie",
      favorite: false,
    },
  ];

  try {
    const insertedMovies = await Movie.insertMany(movies);
    res.status(201).json(insertedMovies);
  } catch (error) {
    console.error("Failed to add movies:", error);
    res.status(500).json({ message: "Failed to add movies: " + error.message });
  }
});

module.exports = { getMovies, addMovie, updateMovie, deleteMovie, addMultipleMovies };
