import app from "./app.js";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
dotenv.config({ path: "backend/config/config.env" });
import cloudinary from "cloudinary";

dbConnect();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

// Handled uncaught Exception;

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down the server due to uncaught Exception.");
  server.close(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down the server due to unhandled rejection.");
  server.close(() => {
    process.exit(1);
  });
});
