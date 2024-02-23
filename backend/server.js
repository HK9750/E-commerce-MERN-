import app from "./app.js";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
dotenv.config({ path: "backend/config/config.env" });

dbConnect();

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

// console.log(yt);
// Handled promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down the server due to unhandled rejection.");
  server.close(() => {
    process.exit(1);
  });
});
