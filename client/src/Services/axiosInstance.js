import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1";
const instance = axios.create({
    baseURL: API_URL,
});

instance.interceptors.request.use((config)=>{
     const user = JSON.parse(localStorage.getItem("todoapp"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});
export default instance;