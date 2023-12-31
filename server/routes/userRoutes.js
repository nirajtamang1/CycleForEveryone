import express from "express";

import { deleteOneUser, getAllUser } from "../controllers/userController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-user", getAllUser);
router.delete("/delete-user/:id", requireSignIn, isAdmin, deleteOneUser);

export default router;
