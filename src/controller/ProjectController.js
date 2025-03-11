import Project from "../model/Project.js"
import Admin from "../model/Admin.js"

//create project
export const createProject = async (req, res) => {
    try {
        const adminId = req.admin
        const findSuperadmin = await Admin.findOne({ _id: adminId, isVerified: true })
        
        if (!findSuperadmin) {
            res.status(404).json({
                status: 404,
                message: "superadmin is not found",
                data: []
            })
        }

        if (findSuperadmin.adminrole == "superadmin" || findSuperadmin.adminrole == "subadmin" ) {
            const addProject = new Project({
                projectName: req.body.projectName,
                projectTitle: req.body.projectTitle,
                projectDescription: req.body.projectDescription,
                projectStartDate: req.body.projectStartDate,
                projectEndDate: req.body.projectEndDate,
                projectStatus: req.body.projectStatus
            })
            const saveProject = await addProject.save()
       

            res.status(201).json({
                status: 201,
                message: "project create successfully",
                data: saveProject
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "internal server error",
            data: []
        })
    }
} 

//get all project 
export const getProject = async (req, res) => {
    try {
        const adminId = req.admin
        const findSuperadmin = await Admin.findOne({ _id: adminId, isVerified: true })
        console.log(findSuperadmin, "FFFFFFFFFFFFFFFFFFFFFFFF")
        if (!findSuperadmin) {
            res.status(404).json({
                status: 404,
                message: "superadmin is not found",
                data: []
            })
        }

        if (findSuperadmin.adminrole == "superadmin" || findSuperadmin.adminrole == "subadmin" ) {
             const getData = await  Project.find()
             console.log(getData)
            res.status(201).json({
                status: 201,
                message: "get all project  successfully",
                data: getData
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "internal server error",
            data: []
        })
    }
} 

//get one  project 
export const getProjectById = async (req, res) => {
    try {
        const adminId = req.admin
        const findSuperadmin = await Admin.findOne({ _id: adminId, isVerified: true })
        console.log(findSuperadmin, "FFFFFFFFFFFFFFFFFFFFFFFF")
        if (!findSuperadmin) {
            res.status(404).json({
                status: 404,
                message: "superadmin is not found",
                data: []
            })
        }

        if (findSuperadmin.adminrole == "superadmin" || findSuperadmin.adminrole == "subadmin" ) {
             const getData = await  Project.findOne({_id:req.params.id})
             console.log(getData)
            res.status(201).json({
                status: 201,
                message: "get  project  successfully",
                data: getData
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "internal server error",
            data: []
        })
    }
} 



//update one  project 
export const updateProjectById = async (req, res) => {
    try {
        const adminId = req.admin
        const findSuperadmin = await Admin.findOne({ _id: adminId, isVerified: true})
        if (!findSuperadmin) {
            res.status(404).json({
                status: 404,
                message: "superadmin is not found",
                data: []
            })
        }

        if (findSuperadmin.adminrole == "superadmin" || findSuperadmin.adminrole == "subadmin" ) {
             const updateData = await  Project.updateOne({_id:req.params.id},
                {$set:{projectEndDate:req.body.projectEndDate}},{new:true}
            )
            
            res.status(201).json({
                status: 201,
                message: "update  project  successfully",
                data: updateData
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "internal server error",
            data: []
        })
    }
} 




//delete project

export const deleteProjectById = async (req, res) => {
    try {
        const adminId = req.admin
        const findSuperadmin = await Admin.findOne({ _id: adminId, isVerified: true })
        console.log(findSuperadmin, "FFFFFFFFFFFFFFFFFFFFFFFF")
        if (!findSuperadmin) {
            res.status(404).json({
                status: 404,
                message: "superadmin is not found",
                data: []
            })
        }

        if (findSuperadmin.adminrole == "superadmin") {

              const checkProductId = await Product.findOne({ _id:req.params.id })
                        if(!checkProductId){
                            return res.status(404).json({
                                status: 404,
                                message: "product is not found",
                                data: []
                            })
                        }
             const deleteData = await  Project.deleteOne({_id:req.params.id})
           
            res.status(201).json({
                status: 201,
                message: "delete  project  successfully",
                data:[]
            
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "internal server error",
            data: []
        })
    }
} 