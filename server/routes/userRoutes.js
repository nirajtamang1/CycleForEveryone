import express from "express";

import { deleteOneUser, getAllUser } from "../controllers/userController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes
// router.post(
//   "/create-category",
//   requireSignIn,
//   isAdmin,
//   createCategoryController
// );
// router.put(
//   "/update-category/:id",
//   requireSignIn,
//   isAdmin,
//   updateCategoryController
// );
router.get("/get-user", getAllUser);
router.delete("/delete-user/:id", requireSignIn, isAdmin, deleteOneUser);

// router.get("/single-category/:slug", singleCategoryController);

// router.delete(
//   "/delete-category/:id",
//   requireSignIn,
//   isAdmin,
//   deleteCategoryController
// );

export default router;
