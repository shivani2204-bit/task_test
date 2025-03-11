import jwt from "jsonwebtoken"
import User from "../model/User.js"
import Admin from "../model/Admin.js"
import dotenv from "dotenv"
dotenv.config()


const AuthMiddleware = async(req,res,next)=>{
    try{

        const token = req.headers.auth 
       

        if(!token){
            res.status(404).json({
                status:404,
                message:"superadmin is not found",
                data:[]
            })
        }

        const decode = jwt.verify(token,process.env.SECRECT_KEY)
      
        if(decode.user){
           req.user = decode.user.id
           const checkUser = await User.findOne({_id:req.user,isVerified:true})
         
           if(checkUser){
              next()
           }else{
            res.status(404).json({
                status:404,
                message:" user is not found",
                data:[]
            })
           }
        }else if(decode){
                 req.admin = decode.id
                 const checkAdmin =  await Admin.findOne({_id:req.admin,isVerified:true})
               
                 if(checkAdmin){
                    next()
                 }else{
                    res.status(404).json({
                        status:404,
                        message:"superadmin is not found",
                        data:[]
                    })
                 }
        }

    }catch(error){
        console.log(error)
        res.status(500).json({
            status:500,
            message:"internal server error",
            data:[]
        })
    }
}


export default AuthMiddleware  