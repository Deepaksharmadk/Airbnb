import User from "../models/user.module.js";
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
