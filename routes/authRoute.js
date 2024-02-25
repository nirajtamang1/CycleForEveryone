import express from "express";
import {
  registerController,
  loginController,
  testController,
  updateProfileController,
  // resetPassword,
  postResetPassword,
  forgetPassword,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

// Register
router.post("/register", registerController);
router.post("/login", loginController);

router.post("/forget", forgetPassword);

//Forget Password
router.post("/reset_password/:id/:token", postResetPassword);

//protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);
export default router;
