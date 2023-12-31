import userModel from "../models/userModel.js";
export const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find({ role: 0 });
    res.status(200).send({
      success: true,
      total: user.length,
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
