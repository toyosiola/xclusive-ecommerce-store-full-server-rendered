import "server-only";

import mongoose, { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderedProducts: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        name: { type: String, required: true },
        markedPrice: { type: Number, required: true },
        discount: { type: Number, required: true },
        unitAmountPaid: { type: Number, required: true },
        quantity: { type: Number, required: true },
        totalAmountPaid: { type: Number, required: true },
      },
    ],
    orderSubtotal: { type: Number, required: true },
    orderTotal: { type: Number, required: true },
    paymentStatus: { type: String, required: true },
    deliveryStatus: { type: String, default: "pending" },
    stripeSessionId: { type: String, required: true },
  },
  { timestamps: true },
);

const Order = models?.Order || model("Order", orderSchema);

export default Order;
