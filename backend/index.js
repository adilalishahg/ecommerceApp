import path from 'path'
import dotenv from 'dotenv'
import cookieparser from 'cookie-parser'

//utiles

import connectDB from './config/db.js'
import express from 'express'

dotenv.config()

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))