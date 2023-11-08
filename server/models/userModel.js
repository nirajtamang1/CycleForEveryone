import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    answer:{
      type:String,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
