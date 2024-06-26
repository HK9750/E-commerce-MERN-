const sendToken = (res, statusCode, user) => {
  const token = user.generateJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    // httpOnly: true,
    // secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
  });
};
export default sendToken;
