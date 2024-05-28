import "server-only";
import mongoose, { Schema, model, models } from "mongoose";

const wishlistSchema = new Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

wishlistSchema.index({ product: 1, user: 1 }, { unique: true });

const Wishlist = models?.Wishlist || model("Wishlist", wishlistSchema);

export default Wishlist;
