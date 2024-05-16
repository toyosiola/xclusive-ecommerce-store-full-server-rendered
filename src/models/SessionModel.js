import "server-only";

import mongoose, { Schema, model, models } from "mongoose";

const sessionSchema = new Schema(
  {
    cart: {
      type: [
        {
          product: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Product",
          },
          cartQuantity: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true },
);

const Session = models?.Session || model("Session", sessionSchema);
export default Session;
