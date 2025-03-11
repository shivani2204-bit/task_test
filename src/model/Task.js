import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:false
    },
    Description:{
        type:String,
        required:false
    },
    DueDate:{
        type:String,
        required:false
    },
    Status:{
        type:String,
        required:false
    },
    Priority:{
        type:String,
        required:false
    },
    Projects:{
        type:String,
        required:false
    }
   
})


const Task = new mongoose.model("Task",taskSchema)

export default Task 