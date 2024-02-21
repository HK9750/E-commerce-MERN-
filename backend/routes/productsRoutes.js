import express from "express";
import {
  getAllProducts,
  createProduct,
} from "../controllers/productsController.js";

const router = express.Router();

router.route("/product").get(getAllProducts);
router.route("/product/new").post(createProduct);

export default router;
