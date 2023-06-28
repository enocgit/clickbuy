import { Mongoose, Schema, model, models } from "mongoose";


const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      unique: [true, "Product already exists"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"]
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity of product in stock in required"]
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product should belong to a Category"]
    },
    featured: {
      type: Boolean,
    },
    extras: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.Product || model("Product", productSchema);
