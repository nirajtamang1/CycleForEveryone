import orderModel from "../models/orderModel.js";
export const getAllOrder = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Order not get",
    });
  }
};
export const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    await orderModel.findByIdAndDelete(orderId);
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ success: false, message: "Failed to delete order" });
  }
};
