import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";
 
const createUser = asyncHandler(async (req, res) => {
    const {username,email,password} = req.body
   
    if(!username||!email||!password){
        throw new Error("Please fill all the fields")
    } 
    const userExist = await User.findOne({email})
    
    if(userExist) res.status(400).send("User already exists") 
const hashedPassword = await encryptPasword(password)
    const newUser = new User({username,email,password:hashedPassword})
try {
    await newUser.save()
     
    generateToken(res,newUser._id)
    res.status(201).json({
        _id:newUser._id,
        username:newUser.username,
        email:newUser.email,
        isAdmin:newUser.usAdmin
    })
} catch (error) {
    res.status(400)
    throw new Error("Invalid user data")
}
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body 
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        generateToken(res,user._id)
        res.status(200).json({
            _id:user._id,
            username:user.username,
            email:user.email,
            isAdmin:user.isAdmin
        })
    }else{
        res.status(401)
        throw new Error("Invalid email or password")
    }
})
const logoutCurrentUser= asyncHandler(async(req,res)=>{
    res.cookie("jwt","",{httpOnly:true,maxAge:new Date(0)})
    res.status(200).json({message:"User logged out"})
})

const getAllUsers = asyncHandler(async(req,res)=>{
      const users = await User.find({})
      res.json(users)
})
const  getCurrentUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id:user._id,
            username:user.username,
            email:user.email 
        })
    }else{
        res.status(404)
        throw new Error("User not found")
    }
})
const updateCurrentUserProfile = asyncHandler(async(req,res)=>{
   
    const user = await User.findById(req.user._id) 
    if(!user){
        res.status(404)
        throw new Error("User not found")
    }
    user.username = req.body.username||user.username;
    user.email = req.body.email||user.email;
    user.password = await encryptPasword(req.body.password)||user.password;
   
    const updatedUser = await user.save()
    res.json({
        _id:updatedUser._id,
        username:updatedUser.username,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin
    })
    
})
const deleteUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(user){
        if(user.isAdmin){
            res.status(400)
            throw new Error("Cannot delete admin")
        }
        await user.deleteOne({_id:user._id})
        res.json({message:"User removed"})
    }else{
        res.status(404)
        throw new Error("User not found")
    }
})
const getUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password")
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error("User not found")
    }
})
const UpdateUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(user){
        user.username = req.body.username||user.username
        user.email = req.body.email||user.email
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save()
        res.json({
            _id:updatedUser._id,
            username:updatedUser.username,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        })
    }else{
        res.status(404)
        throw new Error("User not found")
    }
})

async function encryptPasword(pass){
    const salt =await bcrypt.genSalt(10) 
    return await bcrypt.hash(pass,salt)
}
export {createUser,loginUser,UpdateUserById,getAllUsers,getUserById,deleteUser,logoutCurrentUser,getCurrentUserProfile,updateCurrentUserProfile}