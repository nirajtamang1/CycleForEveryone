import express from "express";
import { verifyPayment } from "../controllers/esawaController.js";
import { paymentController } from "../controllers/productController.js";
const router = express.Router();

router.post("/payment", verifyPayment, paymentController);
export default router;
