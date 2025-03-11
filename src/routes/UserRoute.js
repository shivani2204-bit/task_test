import { Router} from "express";
import uploadmulter from '../middleware/Uploadfiles.js'
const userRouter = Router()
import {userRegister,getAllUser,userLogin,RefreshToken} from '../controller/UserController.js'

userRouter.post("/userRegister",uploadmulter,userRegister);
userRouter.get("/getAllUser",getAllUser);
userRouter.post("/userLogin",userLogin);
userRouter.post("/Refresh-Token",RefreshToken);



export default userRouter