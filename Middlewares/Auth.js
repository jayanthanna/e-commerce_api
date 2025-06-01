import { User } from "../Models/User.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const token = req.header("Auth");

  if (!token)
    return res.status(401).json({
      message: "Login first to access this resource",
      success: false,
    });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded.userId;
  let user = await User.findById(id);
  if (!user)
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  req.user = user;
  next();
};
