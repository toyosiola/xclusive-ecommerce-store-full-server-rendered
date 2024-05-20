import "server-only";
import mongoose, { Schema, model, models } from "mongoose";

const wishlistSchema = new Schema(
  {
    product: { type: mongoose.Types.ObjectId, required: true },
    user: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true },
);

wishlistSchema.index({ product: 1, user: 1 }, { unique: true });

const Wishlist = models?.Wishlist || model("Wishlist", wishlistSchema);

export default Wishlist;
