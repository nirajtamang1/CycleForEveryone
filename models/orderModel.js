import mongoose from "mongoose";

const cartProduct = mongoose.Schema({
  rfid: {
    type: Number,
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
  duration: {
    type: String,
    required: true,
  },
  selectedDateTime: {
    type: String,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    products: [cartProduct],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model("orders", orderSchema);
