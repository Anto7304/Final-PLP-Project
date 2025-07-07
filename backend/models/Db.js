const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb connected successfully")
    } catch (error) {
        console.error("mongodb failed", error)
        process.exit(1);
    }
}

module.exports = connectDB;