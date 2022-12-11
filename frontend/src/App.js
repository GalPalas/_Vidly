import { Routes, Route, Navigate } from "react-router-dom";
import Customers from "components/Customers";
import Movies from "components/Movies";
import NotFound from "components/NotFound";
import Rentals from "components/Rentals";
import NavBar from "components/NavBar";
import MovieForm from "components/MovieForm";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/movies/:id" element={<MovieForm />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Navigate form="/" to="/movies" />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
