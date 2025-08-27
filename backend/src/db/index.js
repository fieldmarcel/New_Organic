import mongoose from "mongoose";
import {DB_NAME } from "../constants.js";
const connectDB = async () => {
    try {
        const mongoConnect = await mongoose.connect(`${process.env.MONGODB_URI}/foodchef1`);
        console.log(`MongoDB connected:!!DB HOST:${mongoConnect.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error has happended:",error.message);
        process.exit(1);
    }
};

export default connectDB;
