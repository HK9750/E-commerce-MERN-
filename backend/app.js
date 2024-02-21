import express from "express";
import productsRoutes from "./routes/productsRoutes.js";
const app = express();

app.use(express.json());

// Routes
app.use("/api/v1", productsRoutes);

export default app;
