import express from "express"; 
import formidable from 'express-formidable'
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import { addProduct, updateProductDetails ,removeProduct,fetchProducts } from "../controllers/productController.js";
const router = express.Router();

 
router.route('/').get(fetchProducts).post(authenticate,authorizeAdmin,formidable(),addProduct)
router.route('/:id')
.put(authenticate,authorizeAdmin,formidable(),updateProductDetails)
.delete(authenticate,authorizeAdmin,formidable(),removeProduct)

export default router