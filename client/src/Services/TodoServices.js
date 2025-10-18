import axios from "./axiosInstance.js";

// get user token from local storage
const user = JSON.parse(localStorage.getItem("todoapp"));
// default auth header
if(user && user.token){
  axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;
}
// create todo
const createTodo = (todoData) => {
    return  axios.post("/todo/create", todoData);
};
// get all todos
  const getAllTodo = (id) => {
    return axios.post(`/todo/getAll/${id}`);
  }
// update todo
  const updateTodo = (id, todoData) => {
    return axios.patch(`/todo/update/${id}`, todoData);
  };
// delete todo
  const deleteTodo = (id) =>{
    return axios.delete(`/todo/delete/${id}`);
  }
const TodoServices = {createTodo, getAllTodo, updateTodo, deleteTodo};
export default TodoServices ;