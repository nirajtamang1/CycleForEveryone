import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.error(error);
    return res.status(404).send({
      success: false,
      message: "Error in token verifaction",
    });
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    console.log(user.name);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAUthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(404).send({
      success: false,
      message: "Error in Admin Verification",
    });
  }
};
