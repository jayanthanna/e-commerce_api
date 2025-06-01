import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//user register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user)
    return res
      .status(400)
      .json({ message: "User already exists", success: false });

  const hashPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  res.json({
    message: "User registered successfully",
    user,
    success: true,
  });
};

//user login
export const login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .json({ message: "User does not exist", success: false });
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res
      .status(400)
      .json({ message: "Invalid password", success: false });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    message: `Welcome back ${user.name}`,
    token,
    success: true,
  });
};
