import e from "express";
import { Product } from "../Models/Product.js";

//add product
export const addProduct = async (req, res) => {
  try {
    let product = await Product.create(req.body);
    res.status(201).json({
      message: "Product added successfully",
      product,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

//get all products
export const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find({});
    if (!products) {
      return res.status(404).json({
        message: "No products found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Products fetched successfully",
      products,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

//get product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Product fetched successfully",
      product,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Update product by id
export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findByIdAndUpdate(id, req.body, { new: true }); // new: true allows us to add new fields also
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Product updated successfully",
      product,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

//Delete product by id
export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};
