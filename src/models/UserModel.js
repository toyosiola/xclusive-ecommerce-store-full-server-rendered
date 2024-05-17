import "server-only";

import { models, model, Schema } from "mongoose";
import isEmail from "validator/es/lib/isEmail";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide name"],
      minLength: [2, "First name must not be lesser than 2 characters"],
      maxLength: [25, "First name must not be greater than 25 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide name"],
      minLength: [2, "Last name must not be lesser than 2 characters"],
      maxLength: [25, "Last name must not be greater than 25 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      validate: {
        validator: isEmail,
        message: "Please provide valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minLength: [6, "Password must not be less than 6 characters"],
    },
    address: {
      type: String,
      default: "",
      maxLength: [200, "Address must not be greater than 200 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationDate: Date,
    passwordToken: String,
    passwordTokenExpirationDate: Date,
  },
  { timestamps: true },
);

UserSchema.pre("save", async function () {
  // if password is not modified, don't hash password
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default models?.User || model("User", UserSchema);
