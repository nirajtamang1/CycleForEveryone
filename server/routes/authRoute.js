import express from "express";
import * as auth from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
// Register

router.post("/register", auth.registerController);
router.post("/login", auth.loginController);

//Forget Password
router.post("/forget-password", auth.forgetPasswordController);
router.get("/test", requireSignIn, isAdmin, auth.testController);

//protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, auth.updateProfileController);
export default router;
