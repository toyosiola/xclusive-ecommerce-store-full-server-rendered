import { developmentEnv } from "@/app/layout";
import { InternalServerError } from "@/errors";
import mongoose from "mongoose";

export default async function connectDB() {
  const connectionURL = developmentEnv
    ? "mongodb://localhost:27017/xclusive-store"
    : process.env.MONGO_URL;

  try {
    console.log("connecting to database");
    await mongoose.connect(connectionURL);
    console.log("connected");
  } catch (error) {
    console.log("error connecting to database");
    console.log(error);
    throw new InternalServerError("error connecting to database");
  }
}
