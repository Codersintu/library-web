import React, { useContext, useState } from 'react';
import img1 from './assets/1.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


export function Navbar(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="z-50 top-0 sticky h-16 p-8 bg-blue-800 flex items-center justify-between">
      <div className="flex-1 flex items-center gap-4">
        <span className="text-4xl text-white font-bold cursor-pointer">Library</span>

        <div className="hidden md:flex items-center justify-center gap-8">
          <Link to="/">
            <span className="text-xl text-white cursor-pointer">Home</span>
          </Link>
          <Link to="/feed">
            <span className="text-xl text-white cursor-pointer">Newstudent</span>
          </Link>
          <Link to="/post">
            <span className="text-xl text-white cursor-pointer">AllUser</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="cursor-pointer">
          <img className="w-12 h-12 rounded-full bg-cover" src={img1} alt="Profile" />
        </div>

        <button className="ml-4 text-white cursor-pointer hover:text-gray-300" onClick={handleClick}>LogOut</button>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-16 left-0 w-full bg-blue-800`}>
        <div className="flex flex-col items-center gap-6 py-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <span className="text-xl text-white cursor-pointer">Home</span>
          </Link>
          <Link to="/feed" onClick={() => setIsMenuOpen(false)}>
            <span className="text-xl text-white cursor-pointer">Newstudent</span>
          </Link>
          <Link to="/post" onClick={() => setIsMenuOpen(false)}>
            <span className="text-xl text-white cursor-pointer">AllUser</span>
          </Link>
        </div>
      </div>
    </div>
    )
}
