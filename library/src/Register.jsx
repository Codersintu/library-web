import React, { useContext, useRef, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export function Register({setUser}) {
  const username=useRef();
  const email=useRef();
  const password=useRef();
    const {user,isFetching,error,dispatch}=useContext(AuthContext);
    const navigate=useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const handleClick=async(e)=>{
      e.preventDefault();
      const user={
        username:username.current.value,
        email:email.current.value,
        password:password.current.value,
      };
      try {
        await axios.post("https://library-web-backend.onrender.com/api/user/register",user);
        alert('register successfully!');
        navigate('/login');

      } catch (error) {
        setErrorMessage(error.response.data.message);
      };
    };
    
    return (
        <div className=" h-screen bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: 'url(https://images.pexels.com/photos/317355/pexels-photo-317355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)' }}>
      <form onSubmit={handleClick} className=" w-80 h-[350px] flex flex-col items-center p-6 space-y-4 bg-white rounded-lg shadow-lg" type='submit'>
        <h1 className=" text-4xl font-bold text-center">Register</h1>

        <input ref={username} className=" w-full p-2 border border-gray-400 rounded-xl outline-none" type="text"  placeholder="Username..." />

        <input ref={email} className=" w-full p-2 border border-gray-400 rounded-xl outline-none" type="email"  placeholder="email..." />

        <input ref={password} className="w-full p-2 border border-gray-400 rounded-xl outline-none" type="password" placeholder='password...'/>

        <button type='submit' className=" w-full p-3 mt-5 text-white rounded-full bg-blue-500 " >Register</button>
      </form>
      {errorMessage && <div className="text-red-800 mt-14">{errorMessage}</div>}

      <button className="registers absolute top-10 right-10 px-5 py-3 bg-lime-500 text-white rounded-lg border-none">
        <Link  to="/login">Login</Link>
      </button>
    </div>
    )
}
