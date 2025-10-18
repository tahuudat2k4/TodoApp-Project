import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './AuthStyle.css';
import AuthServices from '../../Services/AuthServices';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../Utils/ErrorMessage';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username,setUsername] = useState('');

    const navigate = useNavigate();
  // Register handler
  const registerHandler = async (e)=>{
     try {
      e.preventDefault()
      const data = {username, email, password};
      const res = await AuthServices.registerUser(data);
      toast.success(res.data.message);
      navigate('/login');
      console.log(res.data);
    } catch (err) {
      toast.error(getErrorMessage(err))
      console.log(err);
    }
  }
  return (
    <div class="form-container">
        <form className="form" onSubmit={registerHandler}>
          <div className="mb-3">
            <i className="fa-solid fa-circle-user"></i>
          </div>
          <div className="mb-3">
            <input 
            type="text" 
            className="form-control"
            placeholder='Enter your name'
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            />
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
               Have an account ? <Link to="/Login"> Login</Link>
            </p>
            <button type='submit' className='login-btn'>Create new account</button>
          </div>
        </form>
    </div>
  )
}

export default Register;
