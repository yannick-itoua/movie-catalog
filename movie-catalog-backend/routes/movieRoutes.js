const express = require('express');
const router = express.Router();
const {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  addMultipleMovies,
} = require('../controllers/movieController');

router.route('/').get(getMovies).post(addMovie);
router.route('/:id').put(updateMovie).delete(deleteMovie);

// Nouvelle route pour ajouter plusieurs films
router.route('/bulk').post(addMultipleMovies);

module.exports = router;
