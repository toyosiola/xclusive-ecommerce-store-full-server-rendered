import "server-only";

import { devEnv } from "@/app/layout";
import { InternalServerError } from "@/errors";
import mongoose from "mongoose";

export default async function connectDB() {
  const connectionURL = devEnv
    ? "mongodb://localhost:27017/xclusive-store"
    : process.env.MONGO_URL;

  try {
    await mongoose.connect(connectionURL);
  } catch (error) {
    console.error(error);
    throw new InternalServerError("error connecting to database");
  }
}
