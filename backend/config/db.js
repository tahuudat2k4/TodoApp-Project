const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async ()=>{
    const MONGO_URI = process.env.DEV_MODE === 'development' ? process.env.MONGO_URL_LOCAL : process.env.MONGO_URL_CLOUD;

    try {
        const conn= await mongoose.connect(MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to Mongodb ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`Mongodb Error: ${error}`.bgRed.white)
    }
}

module.exports = connectDB; 
