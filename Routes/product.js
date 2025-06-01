import express from "express";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../Controllers/product.js";

const router = express.Router();

//add product
// @api /api/product/add
router.post("/add", addProduct);

//get all products
// @api /api/product/getAll
router.get("/getAll", getAllProducts);

//get product by id
// @api /api/product/get/:id
router.get("/get/:id", getProductById);

// Update product by id
// @api /api/product/update/:id
router.put("/update/:id", updateProductById);

// Delete product by id
// @api /api/product/delete/:id
router.delete("/delete/:id", deleteProductById);

export default router;
