import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
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
    adminrole:{
        type:String,
        required:false
    },
    isVerified:{
        type:Boolean,
        required:false
    }
})


const Admin = new mongoose.model("Admin",adminSchema)

export default Admin