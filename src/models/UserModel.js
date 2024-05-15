import "server-only";

import { models, model, Schema } from "mongoose";
import isEmail from "validator/es/lib/isEmail";
import bcrypt from "bcryptjs";

const UserSchema = Schema({
  firstName: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 2,
    maxLength: 25,
  },
  lastName: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 2,
    maxLength: 25,
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
    minlength: 6,
  },
  address: {
    type: String,
    default: "",
    maxLength: 200,
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
});

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
