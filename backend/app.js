import express from "express";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
import productsRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
app.use("/api/v1", productsRoutes);
app.use("/api/v1", userRoutes);

// Middleware
import { errorMiddleware } from "./middleware/Error.js";
app.use(errorMiddleware);

export default app;
