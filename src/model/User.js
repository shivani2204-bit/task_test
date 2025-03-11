import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    number:{
        type:Number,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    userrole:{
        type:String,
        required:false
    }
   
})


const User = new mongoose.model("User",userSchema)

export default User