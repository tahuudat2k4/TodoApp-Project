const express = require('express');
const { registerController, loginController } = require('../controllers/userController');

// Router
const router = express.Router()

// Routes
// Register || Post
router.post('/register', registerController);
// Login || Post
router.post('/login', loginController);
// Export
module.exports = router ;