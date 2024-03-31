import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductDetails,
  deleteProduct,
  updateProduct,
  createProductReview,
  getAllReviews,
  deleteProductReview,
} from "../controllers/productsController.js";
import { Authenticate, Authorize } from "../middleware/Auth.js";

const router = express.Router();

router.route("/product").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(Authenticate, Authorize("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(Authenticate, Authorize("admin"), updateProduct)
  .delete(Authenticate, Authorize("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(Authenticate, createProductReview);

router
  .route("/reviews")
  .get(getAllReviews)
  .delete(Authenticate, deleteProductReview);
export default router;
