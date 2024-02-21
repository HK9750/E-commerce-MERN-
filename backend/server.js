import app from "./app.js";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
dotenv.config({ path: "backend/config/config.env" });

dbConnect();

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
