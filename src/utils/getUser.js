import "server-only";
import { unstable_cache } from "next/cache";
import User from "@/models/UserModel";

export default function getUser(query, selectedFields = "") {
  return unstable_cache(
    async function () {
      let user = User.findOne(query);
      if (selectedFields) {
        user.select(selectedFields);
      }
      return await user;
    },
    ["user", query, selectedFields],
    {
      tags: ["users", `users/${query._id}`],
    },
  )();
}
