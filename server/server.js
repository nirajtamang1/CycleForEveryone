import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoutes.js"

import cors from "cors";
//configure env
dotenv.config();

connectDB();

// rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute)
app.use("/api/v1/product", productRoute)

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} port number ${
      process.env.PORT || 8000
    }`
  );
});
