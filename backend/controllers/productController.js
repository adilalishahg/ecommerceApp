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
const fetchProductById = asyncHandler(async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id)
        if(product){

            res.json(product)
        }else{
            res.status(404).json({error:"Product not found"})
        }
    } catch (error) {
        res.status(404).json({error:"Product not found"})
    }
})
const fetchProducts = asyncHandler(async (req,res)=>{
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
const fetchAllProducts = asyncHandler(async (req,res)=>{
    try {
        const products = await Product.find({}).populate('category').limit(12).sort({createdAt:-1})
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:"Server Error"})
    }  
})
const addProductReview = asyncHandler(async (req,res)=>{
    const {rating,comment} = req.body 
    const product = await Product.findById(req.params.id)
    if(product){
        const alreadyReviewed = product.reviews.find(r=>r.user.toString() === req.user._id.toString())
        if(alreadyReviewed){
            res.status(400).json({error:"Product already reviewed"})
            return
        }
        const review = {
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length

        await product.save()
        res.status(201).json({message:"Review added"})
    }else{
        res.status(404).json({error:"Product not found"})
    }
})
const fetchTopProducts = asyncHandler(async (req,res)=>{
     
    try {
        const products = await Product.find({}).sort({rating:-1}).limit(4)
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:"Server Error"})
    }
})
const fetchTopProducts2 = asyncHandler(async (req,res)=>{
    console.log('test')
    return res.json('test')
    
})
const fetchNewProducts = asyncHandler(async (req,res)=>{
    try {
        const products = await Product.find({}).sort({_id:-1}).limit(5)
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(400).json({error:"Server Error"})
    }
})
export {addProduct,updateProductDetails,removeProduct,fetchNewProducts,fetchTopProducts,fetchAllProducts,fetchProducts,fetchProductById,addProductReview}