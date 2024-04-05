import asyncHandler from "../middlewares/asyncHandler.js"; 
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";
import Category from "../models/categoryModel.js";
 
const createCategory = asyncHandler(async (req, res) => {
    try {
        const {name} = req.body
        if(!name.trim()){
            return res.status(400).json({message:"Name is required"})
        }
        const  existingCategory = await Category.findOne({name})
        
        if(existingCategory){
            return res.status(400).json({message:"Category already exist"})
        } 
        const category = await new Category({ name }).save()
        res.status(201).json(category)
     } catch (error) {
        console.log(error)
        return res.status(400).json(error)
     }
})
 
const removeCategory = asyncHandler(async (req, res) => {
   
  try {
      const removed = await Category.findById(req.params.categoryId);
      
      await Category.deleteOne({name:removed.name});
      res.json(removed);
  }catch (error) {
      console.error(error)
      res.status(500).json({error:"Internal Server Error"})
  }
})
const updateCategory = asyncHandler(async (req, res) => {
    try {
        const {name} = req.body
        const {categoryId} = req.params
        const  existingCategory = await Category.findOne({_id:categoryId})
        if(!existingCategory){
            return res.status(400).json({error:"Category not found"})
        } 
        existingCategory.name=name
        // console.log(existingCategory)
        const updatedCategory = await existingCategory.save()
        res.json(name)
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal Server Error"})
    }
})
const listCategory = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});
const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});
export {createCategory,updateCategory,removeCategory,listCategory,readCategory}