import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import bodyParser  from 'body-parser'
import cookieParser from 'cookie-parser' 
import useRoutes from './routes/useRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

//utiles

import connectDB from './config/db.js'

dotenv.config()

const port = process.env.PORT || 5000
 
connectDB()
 

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/api/users",useRoutes) 
app.use("/api/category",categoryRoutes) 
app.use("/api/product",productRoutes) 
app.use("/api/upload",uploadRoutes) 

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) 

app.listen(port,()=>console.log(`server running on port ${port}`))