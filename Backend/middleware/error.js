import winston from "winston";

const error = (err, req, res, next) => {
  winston.error(err.message, err);
  res.status(500).send("Somthing failed.");
};

export default error;
