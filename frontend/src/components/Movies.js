import React, { useState } from "react";
import { getMovies } from "services/fakeMovieService";
import Like from "./common/Like";

const Movies = () => {
  const [movies, setMovies] = useState(getMovies());

  const handleDelete = (movie) => {
    const Movies = movies.filter((m) => m._id !== movie._id);
    setMovies(Movies);
  };

  const handleLike = (movie) => {
    const Movies = [...movies];
    const index = Movies.indexOf(movie);
    Movies[index] = { ...Movies[index] };
    Movies[index].liked = !Movies[index].liked;
    setMovies(Movies);
  };
  return (
    <div className="pt-3">
      {movies.length === 0 ? (
        <p className="lead">There are no movies in the database.</p>
      ) : (
        <div>
          <p className="lead">
            Showing {movies.length} movies in the database.
          </p>
          <table className="table ">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th className="text-center">NumberInStock</th>
                <th className="text-center">DailyRentalRate</th>
                <th />
                <th />
              </tr>
            </thead>

            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td className="text-center">{movie.numberInStock}</td>
                  <td className="text-center">{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onLikeToggle={() => handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Movies;
