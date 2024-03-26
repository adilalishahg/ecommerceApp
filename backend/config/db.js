import mongoose from "mongoose"
 
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.DATABSE_URI)
        console.log('connected')
    } catch (error) {
        console.error(`Error: ${error}`)
        
        setInterval(()=>connectDB(), 5000)
        process.exit(1)
    }
}

export default connectDB