import React, { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export function Feed ()  {
  const [timeSlot, setTimeSlot] = useState(""); 
  const [days, setDays] = useState(0); 
  const [name,setName]=useState("")
  const [amount, setAmount] = useState(0); 
  const [mobile, setMobile] = useState(""); 
  const [address, setAddress] = useState(""); 
  const [seatNo, setSeatNo] = useState(""); 
  const navigate = useNavigate()

  const timeSlotDurations = {
    "9 AM - 3 PM": 6, 
    "9 AM - 6 PM": 9, 
    "10 AM - 10 PM": 12, 
    "3 PM - 6 PM": 1,
    "3 PM - 9 PM": 1,
  };

  const calculateAmount = (startDate, endDate, selectedTimeSlot) => {
    if (startDate && endDate && selectedTimeSlot) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        alert("Start date must be before end date!");
        return;
      }

      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      setDays(diffDays);

      const hourlyRate = 800 / (30 * 8); 
      const hoursInSlot = timeSlotDurations[selectedTimeSlot];
      const totalAmount = diffDays * hoursInSlot * hourlyRate; 
      setAmount(totalAmount);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      mobile,
      address,
      seatNo,
      timeSlot,
      startDate: document.querySelector("input[name='startDate']").value,
      endDate: document.querySelector("input[name='endDate']").value,
    };

    try {
      const response = await axios.post(" http://localhost:5003/api/form/create", data);
        if (response.status === 201) {
          alert("User created successfully!");
          navigate('/')
        }
    
    } catch (error) {
      alert("Error submitting form!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-400 shadow-md rounded-md">
      <h2 className="text-center text-white text-2xl font-bold mb-4">Student Library Form</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-semibold">
            Name:
          </label>
          <input
          id="username"
            type="text"
            placeholder="Username..."
            className="w-full p-2 border border-gray-300 rounded"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}

          />
        </div>

    
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-sm font-semibold">
            Mobile No:
          </label>
          <input
          id="mobile"
            type="number"
            placeholder="+91"
            className="w-full p-2 border border-gray-300 rounded"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>


        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-semibold">
            Home Address:
          </label>
          <textarea
          id="address"
            placeholder="Address..."
            className="w-full p-2 border border-gray-300 rounded"
            rows="2"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

      
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-semibold">
            Select Date Range:
          </label>
          <div className="flex space-x-2">
            <input
            id="date"
              type="date"
              name="startDate"
              className="w-1/2 p-2 border border-gray-300 rounded"
              required
              onChange={(e) =>
                calculateAmount(
                  e.target.value,
                  document.querySelector("input[name='endDate']").value,
                  timeSlot
                )
              }
            />
            <input
              type="date"
              name="endDate"
              className="w-1/2 p-2 border border-gray-300 rounded"
              required
              onChange={(e) =>
                calculateAmount(
                  document.querySelector("input[name='startDate']").value,
                  e.target.value,
                  timeSlot
                )
              }
            />
          </div>
        </div>

        
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Select Seat No:</label>
          <select className="w-full p-2 border border-gray-300 rounded" required   value={seatNo}
            onChange={(e) => setSeatNo(e.target.value)}>
            <option value="">Select a seat</option>
            {Array.from({ length: 40 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                Seat {index + 1}
              </option>
            ))}
          </select>
        </div>

        
        <div className="mb-4">
          <label htmlFor="timeSlot" className="block text-sm font-semibold">
            Select Time Slot:
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            required
            id="timeSlot"
            onChange={(e) => {
              setTimeSlot(e.target.value);
              calculateAmount(
                document.querySelector("input[name='startDate']").value,
                document.querySelector("input[name='endDate']").value,
                e.target.value
              );
            }}
          >
            <option value="">Select a time slot</option>
            {Object.keys(timeSlotDurations).map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

      
        <div className="mb-4 text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Pay Now: ₹{amount.toFixed(2)}
          </button>
        </div>
      </form>
    </div>
  );
};

