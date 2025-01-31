const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: { type: String },
    year: { type: Number },
    description: { type: String },
    favorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
