import { Router } from "express";
import{createTask,getAllTask,updateTask,deleteTask} from '../controller/TaskController.js'
const taskRouter = Router()
taskRouter.post("/createTask",createTask)
taskRouter.get("/getAllTask",getAllTask)
taskRouter.put("/updateTask",updateTask)
taskRouter.delete("/deleteTask",deleteTask)
export default taskRouter