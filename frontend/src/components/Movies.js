import { useState, useEffect } from "react";
import { getMovies } from "services/fakeMovieService";
import { getGenres } from "services/fakeGenreService";
import { paginate } from "utils/paginate";
import Pagination from "components/common/Pagination";
import ListGroup from "components/common/ListGroup";
import MoviesTable from "components/MoviesTable";
import _ from "lodash";

const Movies = () => {
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
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

  const handleSort = (SortColumn) => {
    setSortColumn(SortColumn);
  };

  const getPageData = () => {
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
        : movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const allMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: allMovies };
  };

  const { totalCount, data: allMovies } = getPageData();

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
            <p className="lead">Showing {totalCount} movies in the database.</p>
            <MoviesTable
              movies={allMovies}
              sortColumn={sortColumn}
              onLike={handleLike}
              onSort={handleSort}
              onDelete={handleDelete}
            />
            <Pagination
              itemsCount={totalCount}
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
