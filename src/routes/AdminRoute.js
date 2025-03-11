import { Router} from "express";
const adminRouter = Router()
import {SubAdminRegister,AdminLogin,getSubadmin,getSubadminById,updateSubadminById,deleteSubadminById,RefreshToken} from '../controller/AdminController.js'
import  AuthMiddleware from "../middleware/Auth.js"

adminRouter.post("/SubAdminRegister",AuthMiddleware,SubAdminRegister)
adminRouter.post("/AdminLogin",AdminLogin)
adminRouter.get("/getSubadmin",AuthMiddleware,getSubadmin)
adminRouter.get("/getSubadminById/:id",AuthMiddleware,getSubadminById)
adminRouter.put("/updateSubadminById/:id",AuthMiddleware,updateSubadminById)
adminRouter.delete("/deleteSubadminById/:id",AuthMiddleware,deleteSubadminById)
adminRouter.post("/Refresh-Token",RefreshToken)

export default adminRouter 