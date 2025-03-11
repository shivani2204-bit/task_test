import { Router } from "express";
import  AuthMiddleware from "../middleware/Auth.js"
import{createProject,getProject,getProjectById,deleteProjectById,updateProjectById} from "../controller/ProjectController.js"


const projectRouter = Router()
projectRouter.post("/createProject",AuthMiddleware,createProject)
projectRouter.get("/getProject",AuthMiddleware,getProject)
projectRouter.get("/getProjectById/:id",AuthMiddleware,getProjectById)
projectRouter.delete("/deleteProjectById",AuthMiddleware,deleteProjectById)
projectRouter.put("/updateProjectById",AuthMiddleware,updateProjectById)
export default projectRouter