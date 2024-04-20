import express from "express";
import { Authenticate } from "../middleware/Auth.js";

const router = express.Router();

import { processPayment } from "../controllers/paymentController.js";

router.route("/payment/process").post(Authenticate, processPayment);

export default router;
