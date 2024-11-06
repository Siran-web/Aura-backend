const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB is connected");
    }
    catch(error){
        console.error("Mongo connection error",error);
    }
};

module.exports = connectDB;
