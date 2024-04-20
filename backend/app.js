import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Routes
import productsRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

app.use("/api/v1", productsRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);

// Middleware
import { errorMiddleware } from "./middleware/Error.js";
app.use(errorMiddleware);

export default app;
