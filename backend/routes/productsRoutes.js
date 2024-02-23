import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductDetails,
  deleteProduct,
  updateProduct,
} from "../controllers/productsController.js";

const router = express.Router();

router.route("/product").get(getAllProducts);
router.route("/product/new").post(createProduct);
router
  .route("/product/:id")
  .get(getProductDetails)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
