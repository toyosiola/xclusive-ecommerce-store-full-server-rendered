import "server-only";

import {
  InternalServerError,
  NotFoundError,
  UnauthenticatedError,
} from "@/errors";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import getUser from "./getUser";

export default async function verifySession() {
  const cookie = cookies();
  const session = cookie.get("session")?.value;
  let payload, user;

  if (!session) return null;

  try {
    payload = jwt.verify(session, process.env.JWT_SECRET);
  } catch (error) {
    // if session is invalid, delete session cookie (session is not expected to be invalid)
    cookie.delete("session");
    throw new UnauthenticatedError("Invalid session");
  }

  const { sessionId, userId } = payload;
  // if sessionId is true i.e. there is session but user is not logged in
  if (sessionId) return { isAuth: false, sessionId };

  // if userId is true, user is logged in. Check user in db
  if (userId) {
    try {
      // wrapper for passing cache keys. returns getUser func
      user = await getUser({ _id: userId }, "firstName role");
    } catch (error) {
      // if database error during fetching
      throw new InternalServerError("An error occurred! Please try again");
    }

    // if user is not found in database
    if (!user) {
      cookie.delete("session");
      throw new NotFoundError("User not found");
    }

    return {
      isAuth: true,
      name: user.firstName,
      userId,
      role: user.role,
    };
  }

  // not expected to reach this point
  cookie.delete("session");
  throw new UnauthenticatedError("Invalid session");
}
