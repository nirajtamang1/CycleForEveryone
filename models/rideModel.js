import mongoose from "mongoose";

// Define schema for ride data
const rideSchema = new mongoose.Schema({
  rfid: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    default: null,
  },
  duration: {
    type: Number, // Duration in milliseconds
    default: null,
  },
  price: {
    type: Number,
    default: null,
  },
});
export default mongoose.model("ride", rideSchema);
