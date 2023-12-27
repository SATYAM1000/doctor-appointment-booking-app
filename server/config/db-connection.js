import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URL=process.env.MONGO_URL;
const connectToDatabase=async()=>{
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database connected successfully")
        
    } catch (error) {
        console.log("Database connection failed: ",error)
        
    }
}

export default connectToDatabase;