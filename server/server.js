import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
//configure env
dotenv.config();

connectDB();

// rest object
const app = express();

//middleware
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} port number ${
      process.env.PORT || 8000
    }`
  );
});
