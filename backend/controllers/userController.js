const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

// Register
const registerController = async (req, res) =>{
    try {
        const {username, email, password} = req.body ;
        // Validation
        if(!username || !email || !password){
            return res.status(500).send({
                success: false,
                message: 'Please provide all fields'
            })
        }
        // Check existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(500).send({
                success: false,
                messsage: 'User already exist'
            })
        }
        // hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Save user
        const newUser = new userModel({username, email, password:hashedPassword});
        await newUser.save();
        res.status(201).send({
            success: true,
            message: "User register successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Register API',
            error
        })
    }
}
// Login
const loginController = async(req, res) =>{
    try {
        const {email, password} = req.body;
        // find user
        const user = await userModel.findOne({email});
        // Validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password"
            })
        }
        // Decrypt password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(500).send({
                success: false,
                message: 'Invalid credentials'
            })
        }
        // Token
        const token = await JWT.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
        res.status(200).send({
            success: true,
            message: "Login successfully", 
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Login API',
            error
        })
        
    }
}
module.exports = {registerController, loginController}