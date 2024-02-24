import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { deleteRide, getAllRides } from "../controllers/rideController.js";

const router = express.Router();

router.get("/get-rides",requireSignIn, isAdmin, getAllRides);
router.delete("/deleteRide/:rideId",requireSignIn, isAdmin,deleteRide );
export default router;
