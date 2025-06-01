import { Cart } from "../models/cart.js";

export const addToCart = async (req, res) => {
  const { productId, title, price, quantity } = req.body;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );
  if (itemIndex > -1) {
    // Item already exists in the cart, update quantity
    cart.items[itemIndex].quantity += quantity;
    cart.items[itemIndex].price = price * cart.items[itemIndex].quantity; // Update price if necessary
  } else {
    // Item does not exist, add new item
    cart.items.push({ productId, title, price, quantity });
  }
  await cart.save();
  res.status(200).json({
    message: "Item added to cart successfully",
    cart,
    success: true,
  });
};

//get user cart
export const getUserCart = async (req, res) => {
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
      success: false,
    });
  }
  res.status(200).json({
    message: "Cart fetched successfully",
    cart,
    success: true,
  });
};

//remove item from cart
export const removeFromCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
      success: false,
    });
  }
  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );
  await cart.save();
  res.status(200).json({
    message: "Item removed from cart successfully",
    cart,
    success: true,
  });
};

//clear cart
export const clearCart = async (req, res) => {
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
      success: false,
    });
  } else {
    cart.items = [];
  }
  await cart.save();
  res.status(200).json({
    message: "Cart cleared successfully",
    cart,
    success: true,
  });
};

//decrease item quantity in cart
export const decreaseItemQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );
  if (itemIndex > -1) {
    const item = cart.items[itemIndex];
    if (item.quantity > quantity) {
      // Decrease the quantity
      const pricePerUnit = item.price / item.quantity; // Calculate price per unit
      item.quantity -= quantity;
      item.price -= pricePerUnit * quantity; // Update price if necessary
    } else {
      cart.items.splice(itemIndex, 1); // Remove item if quantity is less than or equal to zero
    }
  } else {
    // Item does not exist, add new item
    return res.status(404).json({
      message: "Item not found in cart",
      success: false,
    });
  }
  await cart.save();
  res.status(200).json({
    message: "Item quantity decreased to cart successfully",
    cart,
    success: true,
  });
};
