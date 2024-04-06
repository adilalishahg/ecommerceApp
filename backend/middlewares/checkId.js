import { isValidObjectId } from "mongoose";

function checkId(req,res,next){
    if(!isValidObjectId(req.params.id)){
        return res.status(400).send({status:false,message:"Invalid user id"})
    }
    next()
}
export default checkId