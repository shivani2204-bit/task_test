import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination:function(req,res,cb){
       cb(null,'./public/upload')
  },
  filename:function(req,res,cb){

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix)
  }
})

const upload = multer({storage:storage})
const uploadmulter = upload.single("finalupload")

export default uploadmulter