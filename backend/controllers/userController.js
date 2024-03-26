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
    const salt = bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
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
export {createUser,loginUser}