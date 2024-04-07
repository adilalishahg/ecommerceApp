import express from "express"; 
import formidable from 'express-formidable'
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import { addProduct, updateProductDetails ,fetchAllProducts,removeProduct,fetchNewProducts,fetchTopProducts,fetchProductById,fetchProducts, addProductReview } from "../controllers/productController.js";
const router = express.Router();

 
router.route('/').get(fetchProducts).post(authenticate,authorizeAdmin,formidable(),addProduct)
router.route('/allproducts').get(fetchAllProducts)
router.route('/:id')
.get(fetchProductById)
.put(authenticate,authorizeAdmin,formidable(),updateProductDetails)
.delete(authenticate,authorizeAdmin,formidable(),removeProduct)

router.route('/:id/reviews').post(authenticate,authorizeAdmin,checkId,addProductReview)

router.get('/top',fetchTopProducts)
router.get('/new',fetchNewProducts)
export default router