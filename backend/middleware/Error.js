import ErrorHandler from "../utils/ErrorHandler.js";

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // If mongoDB Id is wrong;

  if (err.name == "CastError") {
    const message = `Resource not found:${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name == "JsonWebTokenError") {
    const message = `Jsonwebtoken is invalid, Try again..`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name == "TokenExpiredError") {
    const message = `Json web token expired, Try again..`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
