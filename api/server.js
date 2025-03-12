import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import connectDb from "../src/config/ConfigDb.js"
import userRouter from "../src/routes/UserRoute.js"
import taskRouter from "../src/routes/TaskRoute.js"
import projectRouter from "../src/routes/ProjectRoute.js"
import adminRouter from "../src/routes/AdminRoute.js"

const app = express()
dotenv.config()
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 9000;

connectDb()

// app.use("/user",userRouter)
// app.use("/task",taskRouter)
// app.use("/admin",adminRouter)
// app.use("/project",projectRouter)

app.get('/', (req, res) => {
  res.send("hello world of testing the deployment on vercel...");
});

// let server = app.listen(port,()=>{
//     connectDb()
//     console.log("server is running on port 9000")
// })

// export default server;

app.listen(port, () => {
  console.log(`app listen on ${port}`);
});