import express from "express";
import { deleteOrder, getAllOrder } from "../controllers/orderController.js";

const router = express.Router();

router.get("/getAllOrder", getAllOrder);
router.delete("/deleteOrder/:orderId", deleteOrder);

export default router;
