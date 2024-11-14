import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Slots = () => {
  const navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem('admin-token')){
          navigate('/adminLogin');
      }
    },[]);
  // Mock data for parking slots (this should come from the backend)
  const slots = [
    { parking_id: 'P001', slot_id: 'S001', length: '5m', width: '3m', height: '2.5m', isEmpty: true },
    { parking_id: 'P002', slot_id: 'S002', length: '6m', width: '3m', height: '3m', isEmpty: false },
    { parking_id: 'P003', slot_id: 'S003', length: '5.5m', width: '3.5m', height: '2.8m', isEmpty: true },
    { parking_id: 'P004', slot_id: 'S004', length: '5m', width: '3m', height: '2.5m', isEmpty: false },
    { parking_id: 'P005', slot_id: 'S005', length: '6m', width: '3m', height: '3m', isEmpty: true },
    { parking_id: 'P006', slot_id: 'S006', length: '6m', width: '3m', height: '3m', isEmpty: false },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="container mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Parking Slots</h1>
          <p className="text-xl text-gray-600">Here are the available parking slots for each location.</p>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
          <table className="min-w-full table-auto">
            <thead className="bg-pink-300 text-gray-800">
              <tr>
                <th className="px-6 py-4 text-left">Parking ID</th>
                <th className="px-6 py-4 text-left">Slot ID</th>
                <th className="px-6 py-4 text-left">Length</th>
                <th className="px-6 py-4 text-left">Width</th>
                <th className="px-6 py-4 text-left">Height</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot.slot_id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{slot.parking_id}</td>
                  <td className="px-6 py-4">{slot.slot_id}</td>
                  <td className="px-6 py-4">{slot.length}</td>
                  <td className="px-6 py-4">{slot.width}</td>
                  <td className="px-6 py-4">{slot.height}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-4 py-2 rounded-full text-white ${
                        slot.isEmpty ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {slot.isEmpty ? 'Available' : 'Occupied'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Slots;
