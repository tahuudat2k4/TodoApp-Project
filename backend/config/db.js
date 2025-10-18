const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async ()=>{
    try {
        const conn= await mongoose.connect(process.env.MONGO_URL_LOCAL)
        console.log(`Connected to Mongodb ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`Mongodb Error: ${error}`.bgRed.white)
    }
}

module.exports = connectDB; 
