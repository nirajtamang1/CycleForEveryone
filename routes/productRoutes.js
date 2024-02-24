import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  bookingController,
  createProductController,
  deleteProductController,
  getProductController,
  getProductRFID,
  getSingleProductController,
  paymentController,
  postRfidData,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//get all products
router.get("/get-product", getProductController);

// get single product
router.get("/get-product/:slug", getSingleProductController);
// get single product
router.get("/get-rfid/:rfid", getProductRFID);

router.post("/post-rfid", postRfidData);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFilterController);

//product count
router.get("/product-count", productCountController);

//product per pages
router.get("/product-list/:page", productListController);

//similar Product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product display
router.get("/product-category/:slug", productCategoryController);

router.post("/booking", bookingController);

router.post("/payment", paymentController);

export default router;
