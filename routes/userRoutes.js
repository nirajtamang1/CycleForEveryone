import express from "express";

import {
  deleteOneUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
} from "../controllers/userController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-user", requireSignIn, isAdmin, getAllUser);
router.get("/get-user/:id", requireSignIn, isAdmin, getSingleUser);
router.put("/update-user/:id", requireSignIn, isAdmin, updateSingleUser);
router.delete("/delete-user/:id", requireSignIn, isAdmin, deleteOneUser);
router.delete("/deleteUser/:email", requireSignIn, deleteUser);

export default router;
