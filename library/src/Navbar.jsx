import React, { useContext } from 'react';
import img1 from './assets/1.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


export function Navbar(props) {
    const {dispatch,state}=useContext(AuthContext);
    const navigate=useNavigate();
     
    const handleClick=(e)=>{
        e.preventDefault();
        try {
            dispatch({type:"LOGOUT"});
            localStorage.removeItem("token"); 
           sessionStorage.clear(); 
           navigate('/register')
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
            console.log(error)
            }
        }
       
    }

    return (
        <div className="z-50 top-0 sticky h-12 p-8 bg-blue-800 flex items-center justify-around">   
           <div className=" flex-1 flex items-center  gap-40">
            <span className='text-4xl text-white font-bold cursor-pointer'>Library</span>
            <div className="flex items-center justify-center gap-20 ">
            <Link to='/'>
            <span className='text-xl text-white cursor-pointer'>Home</span>
            </Link>
            <Link to='/feed'>
            <span className='text-xl text-white cursor-pointer'>Newstudent</span>
            </Link>
            <Link to='/post'>
            <span className='text-xl text-white cursor-pointer'>AllUser</span>
            </Link>
            </div>
            </div>
           
            <div className="cursor-pointer">
                <img className=' w-12 h-12 rounded-full bg-cover' src={img1} alt="" />
            </div>

            <button className='ml-4 text-white cursor-pointer hover:text-gray-300' onClick={ handleClick}>LogOut</button>
            
           
        </div>
    )
}
