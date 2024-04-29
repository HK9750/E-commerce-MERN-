import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} from "../controllers/userController.js";
import { Authorize, Authenticate } from "../middleware/Auth.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(Authenticate, getUserDetails);
router.route("/me/update").put(Authenticate, updateProfile);
router.route("/updatePass").put(Authenticate, updateUserPassword);
// AdminRoutes
router.route("/admin/users").get(Authenticate, Authorize("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(Authenticate, Authorize("admin"), getSingleUser)
  .put(Authenticate, Authorize("admin"), updateUserRole)
  .delete(Authenticate, Authorize("admin"), deleteUser);

export default router;
