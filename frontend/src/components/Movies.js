import { useState, useEffect } from "react";
import { getMovies } from "services/fakeMovieService";
import { getGenres } from "services/fakeGenreService";
import { paginate } from "utils/paginate";
import Like from "components/common/Like";
import Pagination from "components/common/Pagination";
import ListGroup from "components/common/ListGroup";

const Movies = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const filtered =
    selectedGenre && selectedGenre._id
      ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
      : movies;

  const allMovies = paginate(filtered, currentPage, pageSize);

  useEffect(() => {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    setMovies(getMovies());
    setGenres(genres);
  }, []);

  return (
    <div className="pt-3">
      {movies.length === 0 ? (
        <p className="lead">There are no movies in the database.</p>
      ) : (
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemsSelect={handleGenreSelect}
            />
          </div>
          <div className="col">
            <p className="lead">
              Showing {filtered.length} movies in the database.
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
                {allMovies.map((movie) => (
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
            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
