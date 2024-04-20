import User from "../models/userModel.js";
import AsyncErrorHandler from "../middleware/AsyncErrorHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendToken from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import fs from "fs";
import path from "path";

export const registerUser = AsyncErrorHandler(async (req, res) => {
  const { username, email, password, avatar } = req.body;

  const cloudAvatar = await cloudinary.v2.uploader.upload(
    `data:image/jpeg;base64,${avatar}`,
    {
      folder: "Avatars",
      width: 200,
      height: 200,
    }
  );
  console.log(cloudAvatar);
  const user = await User.create({
    username,
    email,
    password,
    avatar: {
      public_id: cloudAvatar.public_id,
      url: cloudAvatar.url,
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
export const logoutUser = AsyncErrorHandler(async (req, res, next) => {
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
export const forgotPassword = AsyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Email is not correct", 404));
  }

  const resetToken = user.generateResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetPasswordUrl = `http://localhost:5173/password/reset/${resetToken}`;

    const message = `Your password reset token is:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, please ignore it.`;

    await sendEmail({
      email: user.email,
      subject: "Password reset Query",
      message,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      resetToken,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 404));
  }
});
export const resetPassword = AsyncErrorHandler(async (req, res, next) => {
  console.log(req.params.token);
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  console.log(resetPasswordToken);
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Cannot find the user to reset password", 404)
    );
  }

  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Reseted",
    user,
  });
});
export const getUserDetails = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
export const updateUserPassword = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPassCorrect = user.comparePassword(req.body.oldPassword);

  if (!isPassCorrect) {
    return next(new ErrorHandler("Incorrect Old password", 404));
  }

  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Confirm Pass Error", 404));
  }

  user.password = req.body.password;
  await user.save();

  sendToken(res, 200, user);
});

export const updateProfile = AsyncErrorHandler(async (req, res, next) => {
  const updateProfile = {
    username: req.body.username,
    email: req.body.email,
  };
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id);

    const cloudAvatar = await cloudinary.v2.uploader.upload(
      `data:image/jpeg;base64,${req.body.avatar}`,
      {
        folder: "Avatars",
        width: 200,
        height: 200,
      }
    );
    updateProfile.avatar = {
      public_id: cloudAvatar.public_id,
      url: cloudAvatar.url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, updateProfile, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  sendToken(res, 200, user);
});

// Admin Routes

export const getAllUsers = AsyncErrorHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});
export const getSingleUser = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exists with id:${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});
export const updateUserRole = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exists with id:${req.params.id}`)
    );
  }

  const newUser = {
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
  };

  const userF = await User.findByIdAndUpdate(req.params.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    userF,
  });
});
export const deleteUser = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exists with id:${req.params.id}`)
    );
  }

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "User has been deleted.",
  });
});
