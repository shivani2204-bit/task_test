import Task from '../model/Task.js'
import nodemailer from "nodemailer" 
//create task
export const createTask = async(req,res)=>{
    try{
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: "muskanverma99765@gmail.com",
                pass: "ajdf ghkh lvpu aqah",
            }
        })

        const Email = req.body.Email
        const text = req.body.text

        const mailOptions ={
            from:"muskanverma99765@gmail.com",
            to:Email,
            subject:"Hello Dhakkan",
            text:text
        }

      transporter.sendMail(mailOptions,function(error,info){
          if(error){
            console.log(error)
          }else{
            console.log(info)
          }
      })
      
       
        
        const createTask = new Task({
            Title:req.body.Title,
            Description:req.body.Description,
            DueDate:req.body.DueDate,
            Status:req.body.Status,
            Priority:req.body.Priority,
            Projects:req.body.Projects
        })
        const saveTask = await createTask.save()
        return res.status(200).json({
            status:201,
            message:"create task successfully",
            data:saveTask
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
// get all task
export const getAllTask = async(req,res)=>{
    try{
        const getData = await Task.find()
        return res.status(200).json({
            status:200,
            message:"get all task data succesfully",
            data:getData
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
// update task
export const updateTask = async(req,res)=>{
    try{
        const updateTask = await Task.updateOne({Projects:req.body.Projects},
            {$set:{Priority:req.body.Priority}},{new:true})
            return res.status(200).json({
                status:200,
                message:"update task successfully",
                data:updateTask
            })
    }catch(error){;
        console.log(error)
        return res.status(500).json({
            status:500,
            message:"Internal server error",
            data:[]
        })
    }
}
//delete task 
export const deleteTask = async(req,res)=>{
    try{
        const deleteTask = await Task.deleteOne({Project:req.body.Project})
            return res.status(200).json({
                status:200,
                message:"delete task successfully",
                data:[]
            })
    }catch(error){;
        console.log(error)
        return res.status(500).json({
            status:500,
            message:"Internal server error",
            data:[]
        })
    }
}