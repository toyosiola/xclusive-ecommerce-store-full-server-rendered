"use server";

import User from "@/models/UserModel";
import createJWT from "../createJWT";
import { cookies } from "next/headers";

export default async function login(formData) {
  const cookie = cookies();
  const email = formData.get("email");
  const password = formData.get("password");

  // validate inputs
  if (!email || !password) {
    return { success: false, message: "Please provide all inputs" };
  }

  const user = await User.findOne({ email });
  if (!user) {
    return { success: false, message: "Invalid login credentials!" };
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    return { success: false, message: "Invalid login credentials!" };
  }

  // // check if user is verified
  // if (!user.isVerified) {
  //   return {
  //     success: false,
  //     message: "Please check your email to verify your account",
  //   };
  // }

  // synchronize session and user cart here

  // create session token
  const token = createJWT({
    name: user.lastName,
    userId: user._id,
    role: user.role,
  });

  // use either maxAge (in milliseconds) or expires (in new Date() date format)
  cookie.set("session", token, {
    httpOnly: true,
    secure: true,
    maxAge: Number(process.env.SESSION_LIFETIME),
    sameSite: "strict",
    path: "/",
  });

  return {
    success: true,
    message: "Login successful",
    user: { name: user.firstName },
  };
}
