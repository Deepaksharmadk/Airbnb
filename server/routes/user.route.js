import express from "express";
import {
  registerUser,
  loginUser,
  logout,
} from "../controllers/user.controller.js";
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
export default router;
