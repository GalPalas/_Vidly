import axios from "axios";

export const login = (email, password) => {
  return axios.post("http://localhost:5000/api/auth", { email, password });
};
