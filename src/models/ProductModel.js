import { Schema, models, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please, provide name of product"],
      maxLength: [100, "Name can not be more than 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Please, provide product category"],
      enum: {
        values: ["men fashion", "women fashion", "electronics"],
        message: "{VALUE} is not a valid product category",
      },
    },
    tags: {
      type: [String],
      required: [true, "Please, provide product tags"],
      default: [],
    },
    price: {
      type: Number,
      required: [true, "Please, provide product price"],
    },
    averageRating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    freeShipping: { type: Boolean, default: false },
    quantityInStock: {
      type: Number,
      required: [true, "Please, provide available stock quantity"],
    },
    brand: { type: String, default: "" },
    newProduct: { type: Boolean, default: false },
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    discount: { type: Number, default: 0 },
    dimensions: {
      type: {
        length: String,
        width: String,
        height: String,
      },
      default: null,
    },
    images: {
      type: [String],
      required: [true, "Please, provide image url"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", productSchema);

export default Product;
