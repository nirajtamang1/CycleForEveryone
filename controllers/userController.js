import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
export const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find({ role: 0 });
    res.status(200).send({
      success: true,
      message: "All User",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Displaying all User Information",
      error,
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const user = await userModel.find({ _id: req.params.id });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while displaying single User Information",
      error,
    });
  }
};

export const updateSingleUser = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  const hashedPassword = await hashPassword(password);
  const newUser = {
    name,
    email,
    password: hashedPassword,
    phone,
    address,
  };
  try {
    let updateuserInfo = await userModel.updateOne(
      { _id: req.params.id },
      newUser
    );
    res.status(201).json(updateuserInfo);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while updating User information",
    });
  }
};

export const deleteOneUser = async (req, res) => {
  try {
    await userModel.deleteOne({ _id: req.params.id });
    res.status(201).json(userModel);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting User information",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const email = req.params.email;
    await userModel.deleteOne({ email: email });
    res.status(201).json(userModel);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting User Account",
    });
  }
};
