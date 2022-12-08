import { useState } from "react";
import { register } from "../services/userService";
import Joi from "joi";

const Register = () => {
  const [errors, setErrors] = useState({});
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required().label("Name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().min(5).max(255).required().label("Password"),
  });

  // Validate all fields in register form
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = schema.validate(userRegister, options);
    if (!error) return null;

    const _errors = {};
    for (let item of error.details) _errors[item.path[0]] = item.message;

    return _errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const _errors = validate();
    setErrors({ errors: _errors || {} });
    if (_errors) return;

    try {
      await register(userRegister);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const _errors = { ...errors };
        _errors.username = ex.response.data;
        setErrors(_errors);
      }
    }
  };

  // Validate each field in register form
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const rule = schema.extract(name);
    const schemaField = Joi.object({ [name]: rule });
    const { error } = schemaField.validate(obj);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const _errors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) _errors[input.name] = errorMessage;
    else delete _errors[input.name];

    const account = { ...userRegister };
    account[input.name] = input.value;

    setUserRegister(account);
    setErrors(_errors);
  };

  return (
    <div className="p-3">
      <h1 className="text-center display-5">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column justify-content-center align-items-center w-100 mb-3">
          <div className="col-4">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={userRegister.name}
              className="form-control"
              aria-describedby="nameHelp"
              onChange={handleChange}
            />
            <div id="nameHelp" className="form-text text-danger">
              {errors.name}
            </div>
          </div>
          <div className="col-4">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              type="text"
              name="email"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text text-danger">
              {errors.email}
            </div>
          </div>
          <div className="col-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-control"
              aria-describedby="passwordHelp"
              onChange={handleChange}
            />
            <div id="passwordHelp" className="form-text text-danger">
              {errors.password}
            </div>
          </div>
          <div className="col-4">
            <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
              disabled={validate()}
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
