import express from "express";
import genres from "../routes/genres.js";
import customeres from "../routes/customers.js";
import movies from "../routes/movies.js";
import rentals from "../routes/rentals.js";
import users from "../routes/users.js";
import auth from "../routes/auth.js";

const startup = (app) => {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customeres);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};

export default startup;
