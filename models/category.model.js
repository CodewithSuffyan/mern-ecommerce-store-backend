import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
  },
  { timestamps: true },
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
