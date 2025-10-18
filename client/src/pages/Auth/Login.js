import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './AuthStyle.css';
import AuthServices from '../../Services/AuthServices';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../Utils/ErrorMessage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  // Login handler
  const loginHandler = async (e)=>{
    try {
      e.preventDefault()
      const data = {email, password};
      const res = await AuthServices.loginUser(data);
      toast.success(res.data.message);
      localStorage.setItem("todoapp", JSON.stringify(res.data));
      navigate('/home');
      console.log(res.data);
    } catch (err) {
      toast.error(getErrorMessage(err))
      console.log(err);
    }
  }
  return (
    <div class="form-container">
        <form className="form" onSubmit={loginHandler}>
          <div className="mb-3">
            <i className="fa-solid fa-circle-user"></i>
          </div>
          <div className="mb-3">
            <input 
            type="email" 
            className="form-control"
            placeholder='Enter your email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input 
            type="password" 
            className="form-control"
            placeholder='Password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
          <div className="form-bottom">
            <p className='text-center'>
              Don't have account ? Create <Link to="/register"> Account</Link>
            </p>
            <button type='submit' className='login-btn'>Login</button>
          </div>
        </form>
    </div>
  )
}

export default Login;
