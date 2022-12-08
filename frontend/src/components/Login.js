import { useState } from "react";
import { login } from "../services/authService";

const Login = () => {
  const [userAuth, setUserAuth] = useState({ email: "", password: "" });
  //   const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(userAuth.email, userAuth.password);
  };

  return (
    <div className="p-3">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={(e) =>
              setUserAuth({ ...userAuth, email: e.target.value })
            }
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            onChange={(e) =>
              setUserAuth({ ...userAuth, password: e.target.value })
            }
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
