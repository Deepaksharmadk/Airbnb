import User from "../models/user.module.js";
import { Jwt } from "jsonwebtoken";
import { createTokenCookie } from "../utils/createTokenCookie.js";
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name) {
      res.status(404).json({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      res.status(404).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      res.status(404).json({
        success: false,
        message: "Password is required",
      });
    }
    let user = await User.findOne({ email });
    if (user) {
      res.status(401).json({
        success: false,
        message: "User already exists!",
      });
    }
    user = await User.create({
      name,
      email,
      password,
    });
    user.password = undefined;
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
export const loginUser = async (req, res, next) => {
  // data from frontend via body
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Invalid email or password!",
      });
      const ispasswordCorrect = await user.isPasswordValidated("password");
      if (!ispasswordCorrect) {
        res.status(404).json({
          success: false,
          message: "Invalid email or password",
        });
      }
      createTokenCookie(res, user, 200, "Logged in successfully!");
    }
  } catch (error) {
    console.log(error);
  }
};
