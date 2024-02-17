import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import rideModel from "../models/rideModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { rfid, name, description, price, category } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !rfid:
        return res.status(404).send({ message: "Rfid must requited" });
      case !name:
        return res.status(500).send({ message: "Name is required" });
      case !description:
        return res.status(500).send({ message: "Description is required" });
      case !price:
        return res.status(500).send({ message: "price is required" });
      case !category:
        return res.status(500).send({ message: "category is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ message: "Photo is required and should be less than 1 mb" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating Product",
      error,
    });
  }
};

//get All Products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: products.length,
      message: "All Product",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Displaying all Product",
      error,
    });
  }
};

//sigle Product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Dispaly single product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in displaying one product",
      error,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Displaying photo",
    });
  }
};

export const deleteProductController = async (req, res) => {
  res.status("Delete");
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Delete Sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in deleting product",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ message: "Name is required" });
      case !description:
        return res.status(500).send({ message: "Description is required" });
      case !price:
        return res.status(500).send({ message: "price is required" });
      case !category:
        return res.status(500).send({ message: "category is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ message: "Photo is required and should be less than 1 mb" });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating Product",
      error,
    });
  }
};

//Filters
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
    });
  }
};

//Product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send()({
      message: "Error in product count",
      error,
      message: false,
    });
  }
};

//product list  based on pages
export const productListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("--photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in per pages",
      error,
    });
  }
};

//similar Product
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(1)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error while related product",
      error,
    });
  }
};

//category product controller
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting category product",
    });
  }
};

export const bookingController = async (req, res) => {
  try {
    const { username, totalAmount, cart, email } = req.body;
    console.log(username);
    console.log(cart);
    console.log(totalAmount);
    const order = new orderModel({
      username: username,
      products: cart,
      payment: totalAmount,
      email: email,
    });
    await order.save();
    res.status(200).send({
      success: true,
      message: "Sucessfully Cash on Hand",
      order: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//GET Data Using Rfid
export const getProductRFID = async (req, res) => {
  try {
    console.log(req.params.rfid);
    const product = await productModel
      .findOne({ rfid: req.params.rfid })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Dispaly RfID product",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in displaying one product",
      error,
    });
  }
};
const startTimes = {};
//Post data from Rfid
export const postRfidData = async (req, res) => {
  try {
    const request = req.body;
    console.log("Read Rfid");
    console.log(request["rfid"]);
    let rfid = request["rfid"];

    if (rfid !== null) {
      if (!startTimes[rfid]) {
        // If start time for this RFID tag doesn't exist, it means this is the start of the ride
        startTimes[rfid] = new Date();
        console.log("Cycle Ride Started");
        res.status(200).send({
          message: "Cycle ride started",
        });
      } else {
        // If start time exists, this is the end of the ride
        const startTime = startTimes[rfid];
        delete startTimes[rfid]; // Remove the start time from map

        // Calculate time difference
        const endTime = new Date();
        const rideDuration = endTime - startTime; // Time difference in milliseconds
        console.log("End ride cycle");

        await rideModel.create({
          rfid: rfid,
          startTime: startTime,
          endTime: endTime,
          duration: rideDuration / 6000,
        });
        res.status(200).send({
          message: "Cycle ride ended",
          duration: rideDuration, // Send ride duration in milliseconds
        });
      }
    } else {
      res.status(404).send({
        message: "Invalid RFID tag",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while posting data",
      error,
    });
  }
};

export const paymentController = async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    const path = process.env.ESEWA_URL;
    const params = {
      amt: amount,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: amount,
      pid: orderId,
      scd: process.env.ESEWA_MARCHANT_CODE,
      su: "http://localhost:3000/dashboard/user/orders",
      fu: "http://localhost:3000/users/esewa_payment_failed",
    };

    return res.json({ path, params });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to initiate payment" });
  }
};
