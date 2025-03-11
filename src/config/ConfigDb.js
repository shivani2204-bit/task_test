import mongoose from "mongoose";
import dotenv, { config } from "dotenv"
dotenv.config();
const connectDb = async () => {
    try {
        const mongo_url = process.env.MONGO_URL
        await mongoose.connect(mongo_url)
        console.log("Data base is connected")
    } catch (error) {
        console.log(error)
    }
}

export default connectDb