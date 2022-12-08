import axios from "axios";

export const getGenres = () => {
  return axios.get("http://localhost:5000/api/genres");
};

export const saveGenre = (genre) => {
  return axios.post("http://localhost:5000/api/genres", genre);
};
