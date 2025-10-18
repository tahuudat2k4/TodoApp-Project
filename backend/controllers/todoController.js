const todoModel = require("../models/todoModel");

// create todo
const createTodoController = async (req,res) =>{
    try {
        const {title,description,createdBy} = req.body;
        if(!title || !description ){
            return res.status(500).send({
                success: false,
                message: "Please provide title and description"
            });
        } 
        const todo = await todoModel({title,description,createdBy});
        const result = await todo.save();
        res.status(201).send({
            success: true,
            message: "Your task has been created",
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating todo",
            error
        });
        
    }
}
// get all todos
const getTodoController = async (req,res) =>{
    try {
        // get user id from req
        const {userId} = req.params
        // validate user id
        if(!userId){
            return res.status(404).send({
                success: false,
                message: "No user found with this id"
            });
        }
        // find task 
        const todos = await todoModel.find({createdBy: userId});
        if(!todos){
            return res.status(404).send({
                success: false,
                message: "You have no tasks"
            });
        }
        res.status(200).send({
            success: true,
            message: "Your tasks are",
            todos
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting todos",
            error
        });
    }
}
// Delete todo
const deleteTodoController = async (req,res) =>{
    try {
    const {id} = req.params;
    // validate id
    if(!id){
        return res.status(404).send({
            success: false,
            message: "No todo found with this id",

        });
    } 
    // find id
    const todo = await todoModel.findByIdAndDelete({_id: id});
    if(!todo){
        return res.status(404).send({
            success: false,
            message: "No task found with this id",
        });
    }
    res.status(200).send({
        success: true,
        message: "Your task has been deleted",
        todo
    });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in deleting todo",
            error
        });
        
    }
}
// Update todo
const updateTodoController = async (req,res) =>{
    try {
        const {id} = req.params ;
        const data = req.body;
        // validate id
        if(!id){
            return res.status(404).send({
                success: false,
                message: "No todo found with this id"
            })}
        // find and update
        const todo = await todoModel.findByIdAndUpdate(id,{$set: data},{new: true});
        res.status(200).send({
            success: true,
            message: "Your task has been updated",
            todo
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating todo",
            error
        });
    }
}
module.exports = {createTodoController, getTodoController,deleteTodoController, updateTodoController};