import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";
import esewaRoute from "./routes/esewaRoute.js";
import orderRoute from "./routes/orderRoute.js";

import cors from "cors";
//configure env
dotenv.config();

connectDB();

// rest object
const app = express();
// app.use("view enginer", "ejs");

//middleware
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/", esewaRoute);

// app.listen(process.env.PORT, "192.168.254.127", () => {
app.listen(process.env.PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} port number ${
      process.env.PORT || 8000
    }`
  );
});
