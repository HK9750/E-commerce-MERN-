import User from "../models/userModel.js";
import AsyncErrorHandler from "../middleware/AsyncErrorHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendToken from "../utils/jwtToken.js";

export const registerUser = AsyncErrorHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create({
    username,
    email,
    password,
    avatar: {
      public_id: "Avatar public_id",
      url: "Url for avatar",
    },
  });
  sendToken(res, 200, user);
});

export const loginUser = AsyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email or password", 404));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }

  sendToken(res, 200, user);
});
export const logoutUser = AsyncErrorHandler(async (res) => {
  res.cookie("token", null, {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out Successfully",
  });
});
