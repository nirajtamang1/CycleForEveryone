import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //validation
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "Password is required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is required" });
    }
    if (!address) {
      return res.send({ error: "Address is required" });
    }
    // check user
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    //save
    const user = await new userModel ({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
};
}

const loginController = async(req, res) =>{
  try{
    const {email, password} = req.body;
    //Validation
    if(!email || !password){
      return res.status(404).send({
        success: false,
        message: "Invalid Email or password"
      })
    }
    //check user
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(404).send({
        success:false,
        message: "Email is not matched"
      })
    }
    const match = await comparePassword(password, user.password)
    if(!match){
      return res.status(200).send({
        success:false,
        message: "Invalid Password"
      })
    }
    //token
    const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
      expiresIn: "7d",
    });
    
    res.status(200).send({
      success:true,
      message:"login successfully",
      user:{
        name:user.name,
        email:user.email,
        phone:user.phone,
        address: user.address,
      },
      token,
    });
    

  }catch(error){
    console.log(error);
    res.status(500).send({
      message:false,
      message:"Error in login",
    })
  }
}
const testController = (req, res) =>{
  res.send("Protected URL");
}
export {registerController, loginController,testController}

