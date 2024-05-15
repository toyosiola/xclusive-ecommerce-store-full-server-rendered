"use server";

import User from "@/models/UserModel";
import isEmail from "validator/es/lib/isEmail";
import crypto from "crypto";

export default async function createAccount(formData) {
  let verificationToken;
  const userData = Object.fromEntries(formData.entries());
  const { firstName, lastName, email, password, matchingPassword, address } =
    userData;

  // validate input
  if (
    !firstName.trim() ||
    !lastName.trim() ||
    !email ||
    !password ||
    !matchingPassword
  ) {
    return { success: false, message: "Please provide all required inputs" };
  }

  if (!isEmail(email)) {
    return { success: false, message: "Please provide a valid email address" };
  }

  if (password !== matchingPassword) {
    return {
      success: false,
      message: "Passwords do not match. Ensure both fields are the same",
    };
  }

  try {
    const isEmailTaken = await User.findOne({ email });
    if (isEmailTaken) {
      return {
        success: false,
        message: "Email already in use. Please provide a unique email address",
      };
    }

    // first registered user is an admin
    let role = "user";
    if (!isEmailTaken) {
      const isFirstAccount = (await User.countDocuments({})) === 0;
      role = isFirstAccount ? "admin" : "user";
    }

    verificationToken = crypto.randomBytes(40).toString("hex");
    await User.create({
      firstName,
      lastName,
      email,
      password,
      address,
      role,
      verificationToken,
    });
  } catch (error) {
    let errorMessage = "An error occurred! Please try again";
    console.log(error);
    // mongoose validation error
    if (error.name === "ValidationError") {
      errorMessage = Object.values(error.errors)
        .map((item) => item.message)
        .join(", ");
    }

    // mongoose unique value error
    if (error.code && error.code === 11000) {
      errorMessage = `Duplicate value entered for ${Object.keys(
        error.keyValue,
      )}, please choose another one`;
    }

    return { success: false, message: errorMessage };
  }

  // // send verification email
  // try {
  // } catch (error) {
  //   // if error happened sending email, delete created user with email
  // }

  return { success: true, message: "Account successfully created" };
}
