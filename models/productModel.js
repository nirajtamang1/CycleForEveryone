import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    rfid: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "category",
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timeStamps: true }
);
export default mongoose.model("products", productSchema);
