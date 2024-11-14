import React, { useContext, useEffect, useState } from 'react'
import { slotContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom'

const EmptySlots = () => {
  const navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem('admin-token')){
          navigate('/adminLogin');
      }
    },[]);
  const {getEmptySlots} = useContext(slotContext);
  const [emptySlots, setEmptySlots] = useState([]);

  useEffect(()=>{
    const getSlots = async () =>{
      const results = await getEmptySlots();
      setEmptySlots(results?.data);
    }
    getSlots();
  },[getEmptySlots])

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="container mx-auto space-y-8">
        {/* Heading Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Empty Parking Slots</h1>
          <p className="text-xl text-gray-600">View all available empty parking slots</p>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
          <table className="min-w-full table-auto">
            <thead className="bg-green-600 text-white">
              <tr> 
                <th className="py-3 px-6 text-left">Parking ID</th>
                <th className="py-3 px-6 text-left">Slot ID</th>
                <th className="py-3 px-6 text-left">Location</th>
                <th className="py-3 px-6 text-left">Length</th>
                <th className="py-3 px-6 text-left">Width</th>
                <th className="py-3 px-6 text-left">Height</th>
              </tr>
            </thead>
            <tbody>
              {emptySlots?.map((slot) => (
                <tr key={slot.parking_id} className="hover:bg-gray-200 transition duration-200">
                  <td className="py-3 px-6 text-gray-800">{slot.parking_id}</td>
                  <td className="py-3 px-6 text-gray-800">{slot.slot_no}</td>
                  <td className="py-3 px-6 text-gray-800">{slot.location}</td>
                  <td className="py-3 px-6 text-gray-800">{slot.length}</td>
                  <td className="py-3 px-6 text-gray-800">{slot.width}</td>
                  <td className="py-3 px-6 text-gray-800">{slot.height}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EmptySlots
