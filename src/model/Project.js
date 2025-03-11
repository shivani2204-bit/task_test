import mongoose from "mongoose"
const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: false
    },
    projectTitle: {
        type: String,
        required: false
    },
    projectDescription: {
        type: String,
        required: false
    },
     projectStartDate: {
        type:String,
        required: false
    }, 
    projectEndDate: {
        type:String,
        required: false
    }, 
    projectStatus: {
        type: String,
        required: false
    }
})


const Project = new mongoose.model("Project", projectSchema)

export default Project