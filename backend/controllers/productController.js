import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/produtModel.js";

const addProduct = asyncHandler(async (req,res)=>{
    try {
        const {name,description,price,category,quantity,brand} = req.fields
        switch (true) {
            case !name:
                    return res.status(400).json("Name is required") 
            case !description:
                    return res.status(400).json("description is required") 
            case !price:
                    return res.status(400).json("price is required") 
            case !category:
                    return res.status(400).json("category is required") 
            case !quantity:
                    return res.status(400).json("quantity is required") 
            case !brand:
                    return res.status(400).json("brand is required") 
        }
        console.log(req.fields)
        const productExist = await Product.findOne({name})
        if(productExist){
            return res.status(400).json("Product already exist")
        }
        const product = new Product({...req.fields})
        await product.save()
        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
})
const updateProductDetails = asyncHandler(async (req,res)=>{
    try {
        const {name,description,price,category,quantity,brand} = req.fields
        switch (true) {
            case !name:
                    return res.status(400).json("Name is required") 
            case !description:
                    return res.status(400).json("description is required") 
            case !price:
                    return res.status(400).json("price is required") 
            case !category:
                    return res.status(400).json("category is required") 
            case !quantity:
                    return res.status(400).json("quantity is required") 
            case !brand:
                    return res.status(400).json("brand is required") 
        }
        const product = await Product.findByIdAndUpdate(req.params.id,{...req.fields},{new:true})
        await product.save()
        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
})

const removeProduct = asyncHandler(async (req,res)=>{
    try {
        const pageSize = 6;
        const keyword = req.query.keyword?{name:{$regex:req.query.keyword,$options:"i"}}:{}
        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize)
        res.json({products,page:1,pages:Math.ceil(count/pageSize),hasMore:false})
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
})
const fetchProducts = asyncHandler(async (req,res)=>{
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
})

export {addProduct,updateProductDetails,removeProduct,fetchProducts}