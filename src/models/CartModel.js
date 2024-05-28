import "server-only";

import mongoose, { Schema, model, models } from "mongoose";

const cartSchema = new Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cartQuantity: { type: Number, required: true },
  },
  { timestamps: true },
);

cartSchema.index({ product: 1, user: 1 }, { unique: true });

const Cart = models?.Cart || model("Cart", cartSchema);

export default Cart;
