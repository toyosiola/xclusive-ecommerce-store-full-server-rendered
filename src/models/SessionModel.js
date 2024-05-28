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

// Pre-save hook to ensure product uniqueness in session cart array. Mongoose does not provide a built-in way to enforce unique constraints within an array of sub-documents
sessionSchema.pre("save", async function () {
  const products = this.cart.map((item) => item.product.toString());
  const uniqueProducts = new Set(products);

  if (uniqueProducts.size !== products.length) {
    const error = new Error("Duplicate error");
    error.code = 11000;
    throw error;
  }
});

const Session = models?.Session || model("Session", sessionSchema);

export default Session;
