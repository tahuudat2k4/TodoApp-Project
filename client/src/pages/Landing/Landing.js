import React from 'react';
import { Link } from 'react-router-dom';
import Todolist from '../../assets/images/todo.jpg'
import '../Landing/Landing.css'

const Landing = () => {
  return (
    <div className='hero'>
      <div className="intro-text">
        <h1>
          <span className='tagline1'>Organize work and life</span> <br />
          <span className='tagline2'>Create your plan !</span>
        </h1>
        <p>
          Todolist transforms scattered thoughts into clear. Leverage natural <br />
          language recognition to automatically convert your ideas into a smart to-do list.
        </p>
        <Link className="btn red" to="/register">Register Now!</Link>
        <Link className="btn blue" to="/login">Login</Link>
      </div>
      <div className="className">
        <img src={Todolist} alt="todolist" width={"100%"} height={400} />
      </div>
    </div>
  )
}

export default Landing;
