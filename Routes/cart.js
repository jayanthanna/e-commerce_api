import express from "express";
import {
  addToCart,
  clearCart,
  decreaseItemQuantity,
  getUserCart,
  removeFromCart,
} from "../Controllers/cart.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

//add item to cart
//@api /api/cart/add
router.post("/add", isAuthenticated, addToCart);

//get user cart
// @api /api/cart/getuser
router.get("/getUser", isAuthenticated, getUserCart);

//remove item from cart
// @api /api/cart/remove/:productId
router.delete("/remove/:productId", isAuthenticated, removeFromCart);

//clear cart
// @api /api/cart/clear
router.delete("/clear", isAuthenticated, clearCart);

//decrease item quantity
// @api /api/cart/decrease/:productId
router.post("/decrease", isAuthenticated, decreaseItemQuantity);

export default router;
