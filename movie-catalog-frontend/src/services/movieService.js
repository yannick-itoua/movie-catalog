import axios from 'axios';

const API_URL = 'http://localhost:5000/api/movies';

export const getMovies = (page, search) => {
  return axios.get(`${API_URL}?page=${page}&search=${search}`);
};
