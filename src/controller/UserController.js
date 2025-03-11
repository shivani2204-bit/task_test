
import User from "../model/User.js"
import jwt from 'jsonwebtoken'
import bcryptjs from "bcryptjs"
import dotenv from "dotenv"
dotenv.config();

// user-register
export const userRegister = async (req, res) => {
    try {
        const checkUser = await User.findOne({ $or: [{ email: req.body.email }, { number: req.body.number }] })
        const file = req.file
       
        if (!file) {
            return res.status(404).json({
                status: 404,
                message: "file is not found",
                data: []
            })
        }
        if (checkUser) {
            if (checkUser.email == req.body.email) {
                return res.status(400).json({
                    status: 400,
                    message: "this email is already used",
                    data: []
                })
            } else if (checkUser.number == req.body.number) {
                return res.status(400).json({
                    status: 400,
                    message: "this number is already used",
                    data: []
                })
            }
        }

        const saltCount = 10
        const userPassword = req.body.password
        const passwordHash = await bcryptjs.hash(userPassword, saltCount)
      
        const addUser = new User({
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            password: passwordHash
        })
        const saveUser = await addUser.save()
        return res.status(201).json({
            status: 201,
            message: "User register successfully",
            data: saveUser,
            file: file
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            data: []
        })
    }
}
//user-login
export const userLogin = async (req, res) => {
    try {
        const userLogin = await User.findOne({
            $or: [
                { email: req.body.email },
                { number: req.body.number }
            ]
        })

        if (!userLogin) {
            if (req.body.email) {
                return res.status(404).json({
                    status: 404,
                    message: "Email not found",
                    data: []
                });
            }
            if (req.body.number) {
                return res.status(404).json({
                    status: 404,
                    message: "Number not found",
                    data: []
                });
            }
          
        }
        const userPassword = req.body.password
        const dataPassword = userLogin.password
        
        const comparePassword = await bcryptjs.compare(userPassword, dataPassword)
   
        if (comparePassword) {
            const payload = {
                email: userLogin.email,
                id: userLogin._id
            }
             const token = await generateToken(payload)
      const refreshToken = await generateRefreshToken(payload)
            return res.status(200).json({
                status: 200,
                message: "User login successfully",
                data: userLogin,
                token: token,
                refreshToken:refreshToken
            })
        } else {
            return res.status(401).json({
                status: 401,
                message: "Password does not match",
                data: []
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            data: []
        })
    }
}
// get all user
export const getAllUser = async (req, res) => {
    try {
        const getAllUser = await User.find()
        return res.status(200).json({
            status: 200,
            message: "Get all user data successfully",
            data: getAllUser
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            data: []
        })
    }
} 

//genrate token function
const generateToken = ((payload)=>{
    try{
        const token = jwt.sign(payload,process.env.SECRECT_KEY,{expiresIn:"30d"})
        console.log(token)
        return token
    }catch(error){
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            data: []
        })
    }
})

// generateRefreshToken function//

const generateRefreshToken = ((payload)=>{
    try{
        const RefreshToken = jwt.sign(payload,process.env.REFRESH_TOKEN_KEY,{ expiresIn: "30d"})
        console.log(RefreshToken)
        return RefreshToken
    }catch(error){
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            data: []
        })
    }
})

// RefreshToken //
export const RefreshToken = async(req,res)=>{
    try{
        const {refreshToken} = req.body
        const{id,email} =  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY)
        const token = await generateToken({id,email})
        return res.status(200).json({
          status : 200,
          message : "Token refresh success",
          token:token
        })
    }catch(error){
      console.log(error)
      return res.status(500).json({
        status:500,
        message:"Internal server error",
        data:[]
      })
    }
  }
  