import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to mongoDB :)");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default dbConnect;
