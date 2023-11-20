import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgetPasswordController,
  updateProfileController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
// Register

router.post("/register", registerController);
router.post("/login", loginController);

//Forget Password
router.post("/forget-password",forgetPasswordController)
router.get("/test",requireSignIn, isAdmin, testController)

//protected route
router.get("/user-auth",requireSignIn,(req,res)=>{
  res.status(200).send({ok:true});
})

router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
  res.status(200).send({ok:true});
})

//update profile
router.put("/profile", requireSignIn, updateProfileController)
export default router;
