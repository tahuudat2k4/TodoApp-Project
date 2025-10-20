import axios from 'axios';
import instance from './axiosInstance';

const registerUser = (data)=> {
    return instance.post("/user/register", data);
}

const loginUser = (data)=>{
    return instance.post("/user/login", data);
}

const AuthServices = {registerUser, loginUser};
export default AuthServices;