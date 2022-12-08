import axios from "axios";

export const register = (user) => {
  return axios.post("http://localhost:5000/api/users", {
    name: user.name,
    email: user.email,
    password: user.password,
  });
};
