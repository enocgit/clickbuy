import { Schema, model, models } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: [true, "Category already exists"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.Category || model("Category", categorySchema);
