import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";
import orderRoute from "./routes/orderRoute.js";
import rideRoute from "./routes/rideRoute.js"

import cors from "cors";
//configure env
dotenv.config();

connectDB();

// rest object
const app = express();

//middleware
// app.use(cors());
// Configure CORS middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Specify the allowed origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/ride", rideRoute);

// app.listen(process.env.PORT, "192.168.254.127", () => {
app.listen(process.env.PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} port number ${
      process.env.PORT || 8000
    }`
  );
});
