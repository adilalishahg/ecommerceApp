import path from "path"
import express from "express"
import multer from "multer"

const router = express.Router()

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/')
    },
    filename(req,file,cb){
        const extname = path.extname(file.originalname)
        cb(null,`${file.fieldname}-${Date.now()}${extname}`)
    }
})
const fileFilter = (req,file,cb)=>{
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetypes = /image\/jpeg|image\/jpg|image\/png|image\/gif/

    const extname = path.extname(file.originalname).toLowerCase()
    const mimetype = file.mimetype

    if(filetypes.test(extname) && mimetypes.test(mimetype)){
        cb(null,true)
    }else{
        cb(new Error('Images Only'),false)
    }
}

const upload = multer({
    storage,
    fileFilter
})
const uploadSingleImage = upload.single('image') 
 

router.post('/',(req,res)=>{
    uploadSingleImage(req,res,(err)=>{
        if(err){
            res.status(400).json({error:err.message})
        }else if(req.file){
            res.status(200).send({
                message:"FileImage uploaded successfully",
                image:`/${req.file.path}`
            })
        }else{
            res.status(400).send({message:"No image file provided"})
        }
    })
})

export default router