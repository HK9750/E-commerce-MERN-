import express from "express";
import {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getUserOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
const router = express.Router();

import { Authenticate, Authorize } from "../middleware/Auth.js";

router.route("/order/new").post(Authenticate, createOrder);
router.route("/order/:id").get(Authenticate, getSingleOrder);
router.route("/orders/me").get(Authenticate, getUserOrders);
router
  .route("/admin/orders")
  .get(Authenticate, Authorize("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(Authenticate, Authorize("admin"), updateOrder);
router
  .route("/admin/order/:id")
  .delete(Authenticate, Authorize("admin"), deleteOrder);

export default router;
