import "server-only";
import { unstable_cache } from "next/cache";
import User from "@/models/UserModel";
import { connectDB } from "./db";

export default function getUserWrapper(identifier, projection = "") {
  return unstable_cache(
    async function () {
      await connectDB();
      let user = User.findOne(identifier);
      if (projection) {
        user.select(projection);
      }
      return await user;
    },
    ["user", identifier, projection],
    {
      tags: ["users", `users/${identifier._id || identifier.email}`],
      revalidate: 60 * 60 * 24, //one day in seconds
    },
  );
}
