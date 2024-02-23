import express from "express";
import productsRoutes from "./routes/productsRoutes.js";
import { errorMiddleware } from "./middleware/Error.js";
const app = express();
app.use(express.json());

// Routes
app.use("/api/v1", productsRoutes);

// Middleware
app.use(errorMiddleware);

export default app;
