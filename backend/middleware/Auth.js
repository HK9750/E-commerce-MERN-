import AsyncErrorHandler from "./AsyncErrorHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const Authenticate = AsyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Invalid Token authenticated", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

export const Authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role:${req.user.role} is not authorized to access this.`,
          401
        )
      );
    }
    next();
  };
};
