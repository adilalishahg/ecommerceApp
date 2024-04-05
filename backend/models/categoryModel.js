import mongoose  from "mongoose";

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        maxLength:32,
        unique:true,
        required:true
    },
   
},{timestamps:true})

const Category = mongoose.model("Category",categorySchema)

export default Category;//this is the model for the user schema