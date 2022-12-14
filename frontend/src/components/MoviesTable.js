import Table from "components/common/Table";
import Like from "components/common/Like";
import { Link } from "react-router-dom";

const MoviesTable = ({ movies, onLike, onDelete, onSort, sortColumn }) => {
  const columns = [
    {
      path: "title",
      lable: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", lable: "Genre" },
    { path: "numberInStock", lable: "Stock" },
    { path: "dailyRentalRate", lable: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onLikeToggle={() => onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={movies}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MoviesTable;
