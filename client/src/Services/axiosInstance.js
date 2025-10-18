import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
});

instance.interceptors.request.use((config)=>{
     const user = JSON.parse(localStorage.getItem("todoapp"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});
export default instance;