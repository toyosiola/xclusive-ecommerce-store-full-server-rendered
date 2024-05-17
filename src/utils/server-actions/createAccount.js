"use server";

import User from "@/models/UserModel";
import isEmail from "validator/es/lib/isEmail";
import crypto from "crypto";
import transporter from "../nodemailer";
import { devEnv } from "@/app/layout";

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
  try {
    const host = devEnv
      ? "http://localhost:3000"
      : "https://xclusive-store.vercel.app";
    const verificationLink = `${host}/verify-email?t=${verificationToken}&e=${email}`;
    await transporter.sendMail({
      from: `"Xclusive Store" <${process.env.EMAIL}>`,
      to: email,
      subject: "Account Verification",
      text: "Account Verification",
      html: `<h3>Welcome to Xclusive store</h3><h4>Account verification</h4><p>Hello ${firstName} ${lastName},</p><p>Thank you for choosing to shop with us. Please confirm your email address to verify your account by clicking on this link: <a href="${verificationLink}">Verify account.</a></p><p>If you did not sign up for an account on Xclusive store, kindly disregard this email.</p><p>Happy Shopping!</p><p><strong>The Xclusive Team.</strong></p>`,
    });
  } catch (error) {
    // if error happened sending email, delete created user with email
    await User.deleteOne({ email });
    return {
      success: false,
      message: "An error occurred, please try again...",
    };
  }

  return { success: true, message: "Account successfully created" };
}
