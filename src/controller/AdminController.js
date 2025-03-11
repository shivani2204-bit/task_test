import Admin from "../model/Admin.js";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import e from "express";
dotenv.config()

// admin-login
export const AdminLogin = async (req, res) => {
    try {
        const checkAdmin = await Admin.findOne({
            $or: [
                { email: req.body.email },
                { number: req.body.number }
            ]
        })
     
        if (!checkAdmin) {
            return res.status(404).json({
                status: 404,
                message: "admin is not found",
                data: []
            })
        }
        const adminPassword = req.body.password
        const dataPassword = checkAdmin.password
        const comparePassword = await bcryptjs.compare(adminPassword, dataPassword)
        if (comparePassword) {
            const payload = {
                email: checkAdmin.email,
                id: checkAdmin._id,
                adminrole: checkAdmin.adminrole
            }
              console.log(payload, "PPPPPPPPPPPPPP")
            console.log( process.env.REFRESH_TOKEN_KEY,"RRRRRRRRRRRRRRRRRRRRRRRR")
          
            // console.log(process.env.SECRECT_KEY, "SSSSSSSSSSSSS")
            const token = jwt.sign(payload, process.env.SECRECT_KEY, { expiresIn: "2m" })

            const RefreshToken = jwt.sign(payload,process.env.REFRESH_TOKEN_KEY,{expiresIn:"30d"})           
            res.status(200).json({
                status: 200,
                message: "admin login successfully",
                data: checkAdmin,
                token: token,
                RefreshToken:RefreshToken
            })
        } else {
            res.status(401).json({
                status: 401,
                message: "password not  match",
                data: []
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "internal server error",
            data: []
        })
    }
}

// create-sub-admin
export const SubAdminRegister = async (req, res) => {
    try {
        const checkSubAdmin = await Admin.findOne({ $or: [{ email: req.body.email }, { number: req.body.number }] })
        if (checkSubAdmin) {
            if (checkSubAdmin.email == req.body.email) {
                return res.status(400).json({
                    status: 400,
                    message: "this email is already used",
                    data: []
                })
            } else if (checkSubAdmin.number == req.body.number) {
                return res.status(400).json({
                    status: 400,
                    message: "this number is already used",
                    data: []
                })
            }
        }

        const adminId = req.admin
        

        const checkSubperAdmin = await Admin.findOne({ _id: adminId, isVerified: true })

      

        if (!checkSubperAdmin) {
            return res.json({
                status: 404,
                message: "super admin is not found",
                data: [],
            });
        }

        if (checkSubperAdmin.adminrole == "superadmin") {

            const saltCount = 10
            const userPassword = req.body.password
            const passwordHash = await bcryptjs.hash(userPassword, saltCount)
         

            const addSubAdmin = new Admin({
                name: req.body.name,
                email: req.body.email,
                number: req.body.number,
                password: passwordHash,
                adminrole: req.body.adminrole,
                isVerified: req.body.isVerified
            })

            const saveSubAdmin = await addSubAdmin.save()
            return res.status(201).json({
                status: 201,
                message: "SubAdmin register successfully",
                data: saveSubAdmin
            })

        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            data: []
        })
    }
}

// get-sub-admin

export const getSubadmin = async (req, res) => {
    try {

        const adminId = req.admin
        const checkSubperAdmin = await Admin.findOne({ _id: adminId, isVerified: true })
      
        if (!checkSubperAdmin) {
            return res.status(404).json({
                status: 404,
                message: "superAdmin is not found",
                data: []
            })
        }

        if (checkSubperAdmin.adminrole == "superadmin") {
            const getSubadmin = await Admin.find()
            return res.status(200).json({
                status: 200,
                message: "get all subadmin data successfully",
                data: getSubadmin
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            data: []
        })

    }
}

// get-sub-admin-by-id

export const getSubadminById = async (req, res) => {
    try {

        const adminId = req.admin
        const checkSubperAdmin = await Admin.findOne({ _id: adminId, isVerified: true })
       
        if (!checkSubperAdmin) {
            return res.status(404).json({
                status: 404,
                message: "superAdmin is not found",
                data: []
            })
        }

        if (checkSubperAdmin.adminrole == "superadmin") {
            const getSubadmin = await Admin.findOne({_id:req.params.id})
            return res.status(200).json({
                status: 200,
                message: "get subadmin data successfully",
                data: getSubadmin
            })
        }

    } catch (error) {
       
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            data: []
        })

    }
}

// update-sub-admin-by-id
export const updateSubadminById = async (req, res) => {
    try {

        const adminId = req.admin
        const checkSubperAdmin = await Admin.findOne({ _id: adminId, isVerified: true })
        
        if (!checkSubperAdmin) {
            return res.status(404).json({
                status: 404,
                message: "superAdmin is not found",
                data: []
            })
        }

        if (checkSubperAdmin.adminrole == "superadmin") {
            const updateSubadmin = await Admin.updateOne(
                {_id:req.params.id},
                {$set:{number:req.body.number}},
                {new:true}
            )
            return res.status(200).json({
                status: 200,
                message: "update subadmin data successfully",
                data: updateSubadmin
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            data: []
        })

    }
}

// delete-sub-admin-by-id
export const deleteSubadminById = async (req, res) => {
    try {

        const adminId = req.admin
        const checkSubperAdmin = await Admin.findOne({ _id: adminId, isVerified: true })
        
       
        if (!checkSubperAdmin) {
            return res.status(404).json({
                status: 404,
                message: "superAdmin is not found",
                data: []
            })
        }

        if (checkSubperAdmin.adminrole == "superadmin") {
            const checkAdminId = await Admin.findOne({ _id: req.params.id })
            if(!checkAdminId){
                return res.status(404).json({
                    status: 404,
                    message: "subAdmin is not found",
                    data: []
                })
            }
            const deleteSubadmin = await Admin.deleteOne({_id:req.params.id})
            console.log(req.params,"pppppppppppppppp")
            console.log(deleteSubadmin,"dddddddddd")
            return res.status(200).json({
                status: 200,
                message: "delete  subadmin data successfully",
                data: []
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            data: []
        })

    }
}


// generateToken function

const generateToken =((payload)=>{
    try{
        const token = jwt.sign(payload,process.env.SECRECT_KEY,{expiresIn:'1h'})
        return token
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            data: []
        })
    }
})

// generateRefreshToken function
const generateRefreshToken = ((payload)=>{
        try{
            const RefreshToken = jwt.sign(payload,process.env.REFRESH_TOKEN_KEY,{expiresIn:'30d'})
            return RefreshToken
        }catch(error){
            return res.status(500).json({
                status: 500,
                message: "Internal server error",
                data: []
            })
        }
})



// RefreshToken 

export const RefreshToken =  async(req,res)=>{
    try{
        const{refreshToken} = req.body
        const{id,email} = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY)
        const token = await generateToken({id,email})
        return res.status(200).json({
            status : 200,
            message : "Token refresh success",
            token:token
          })
    }catch(error){
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            data: []
        })
    }
}
