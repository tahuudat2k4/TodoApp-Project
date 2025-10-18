const express = require('express');
const { createTodoController, getTodoController, deleteTodoController, updateTodoController } = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


// create todo
router.post("/create", authMiddleware,createTodoController);
// get todos
router.post("/getAll/:userId", authMiddleware, getTodoController);
// delete todos
router.delete("/delete/:id", authMiddleware, deleteTodoController);
// update todos
router.patch("/update/:id", authMiddleware, updateTodoController);
module.exports = router;