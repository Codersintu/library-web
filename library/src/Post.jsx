import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


export function Post(props) {
    const [detail,setDetail]=useState( []);
    const navigate=useNavigate();
    useEffect(()=>{
      const fetchpost=async()=>{
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/');
          return;
        };
  
          const decodedToken = jwt_decode(token);
          const userRole = decodedToken.role;
  
          if (userRole !== 'ADMIN') {
            navigate('/'); 
            return;
          }
  
          const res = await axios.get('https://library-web-backend.onrender.com/api/form/users', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (res.data && res.data.users) {
            setDetail((prevState) => {
              const newUsers = res.data.users;
              const updatedUsers = newUsers.filter(
                (user) => !prevState.some((existingUser) => existingUser._id === user._id)
              );
              return [...prevState, ...updatedUsers];
            });
          }
        
      };
      fetchpost()
    },[]);
   

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Table Example</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">Mobile No</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">Address</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">Seat No</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">Time slot</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">Payment</th>
              </tr>
            </thead>
            <tbody>
              {detail?.map((userdetail,index)=>(
                 <tr key={index} className="text-gray-600">
                 <td className="px-6 py-3 border-b border-gray-300">{userdetail.name}</td>
                 <td className="px-6 py-3 border-b border-gray-300">{userdetail.mobile}</td>
                 <td className="px-6 py-3 border-b border-gray-300">{userdetail.address}</td>
                 <td className="px-6 py-3 border-b border-gray-300">{userdetail.seatNo}</td>
                 <td className="px-6 py-3 border-b border-gray-300">{userdetail.timeSlot}</td>
               </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
}
