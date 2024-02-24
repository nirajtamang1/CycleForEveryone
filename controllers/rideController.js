import rideModel from "../models/rideModel.js";
export const getAllRides = async (req, res) => {
  try {
    const ride = await rideModel.find();
    res.json(ride);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in displaying one product",
      error,
    });
  }
};

export const deleteRide = async (req, res) => {
  const rideId = req.params.rideId;
  try {
    await rideModel.findByIdAndDelete(rideId);
    res
      .status(200)
      .json({ success: true, message: "Rides deleted successfully" });
  } catch (error) {
    console.error("Error deleting :", error);
    res.status(500).json({ success: false, message: "Failed to delete Ride" });
  }
};
