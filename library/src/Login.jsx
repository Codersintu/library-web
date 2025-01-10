import React, { useContext, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import { LoginCall } from '../apiCall';

export function Login(props) {
  const email=useRef();
  const password=useRef();
  const {user,isFetching,dispatch}=useContext(AuthContext);
  const navigate=useNavigate();
  const handleClick=async(e)=>{
    e.preventDefault();
    try {
      await LoginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
      );
     
    } catch (error) {
      alert("Login failed! Please check your email and password.");
    };
  };


    return (
        <div className=" h-screen bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: 'url(https://images.pexels.com/photos/768473/pexels-photo-768473.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500)' }}>
      <form onClick={handleClick} className=" w-80 h-[300px] flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
        <h1 className=" text-4xl font-bold text-center">Login</h1>

        <input ref={email} className=" w-full p-2 border border-gray-400 rounded-xl outline-none mt-4" type="email" placeholder="Email.." />

        <input ref={password} className=" w-full p-2 border border-gray-400 rounded-xl outline-none mt-4" type="password" placeholder='password...' />

        <button className=" w-full p-3 mt-7 bg-blue-700 text-white rounded-full">Login</button>
      </form>

      <button className="registers absolute top-10 right-10 px-5 py-3 bg-lime-500 text-white rounded-lg border-none">
        <Link  to="/register">REGISTER</Link>
      </button>
    </div>
    )
}
