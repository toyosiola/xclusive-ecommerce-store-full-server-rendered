import { productionEnv } from "@/app/layout";
import mongoose from "mongoose";

export default async function connectDB() {
  const connectionURL = productionEnv
    ? process.env.MONGOURL
    : "mongodb://localhost:27017/xclusive-store";

  try {
    console.log("connecting to database");
    await mongoose.connect(connectionURL);
    console.log("connected");
  } catch (error) {
    console.log("error connecting to database");
    console.log(error);
  }
}
