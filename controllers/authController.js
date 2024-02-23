import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    // check user
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    //save
    const user = await new userModel({
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
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not matched",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: false,
      message: "Error in login",
    });
  }
};
export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const oldUser = await userModel.findOne({ email });
    if (!oldUser) {
      console.log("User doesnot exist");
      return res.status(200).send({ message: "User does not existed" });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = JWT.sign({ id: oldUser._id, email: oldUser.email }, secret, {
      expiresIn: "5m",
    });
    const link = `${process.env.FRONTEND_URL}/api/v1/auth/reset_password/${oldUser._id}/${token}`;
    console.log(link);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "cyclesforeveryone@gmail.com",
        pass: "vcnb maxe whyi hjnr",
      },
    });

    var mailOptions = {
      from: "Cycle For Everyone <cyclesforeveryone@gmail.com>",
      to: oldUser.email,
      subject: "Password Reset",
      html: `
      <p>Hello ${oldUser.name},</p>
      <p>You requested to reset your password. Click the link below to reset it:</p>
      <a href="${link}">${link}</a>
      <p>This email link is only valid for 5 minutes</p>
      <p>If you didn't request a password reset, please ignore this email.</p>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log({ Status: "Success", "Email sent: ": info.response });
      }
    });
    res.status(200).send({
      success: true,
      message: "Email Send Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while sending the email",
      error,
    });
  }
};

export const postResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log(id);
  console.log(password);
  const oldUser = await userModel.findOne({ _id: id });
  if (!oldUser) {
    return res.send({ status: "User doesnot Exists" });
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    JWT.verify(token, secret, async (err, tokenRes) => {
      if (err) {
        return res.json({ Status: "Error with token" });
      } else {
        const hashedPassword = await hashPassword(password);
        await userModel.updateOne(
          { _id: id },
          {
            $set: {
              password: hashedPassword,
            },
          }
        );

        return res.send({ Status: "Successs" });
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Not verified",
    });
  }
};

export const testController = (req, res) => {
  res.send("Protected URL");
};

//update profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Success",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};
