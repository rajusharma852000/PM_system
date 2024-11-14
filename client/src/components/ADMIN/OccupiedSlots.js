import React, { useContext, useEffect, useState } from "react";
import { slotContext } from "../../context/Context";
import { useNavigate } from 'react-router-dom'

const OccupiedSlots = () => {
  const navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem('admin-token')){
          navigate('/adminLogin');
      }
    },[]);
  const { getOccupiedSlots } = useContext(slotContext);
  const [occupiedSlots, setOccupiedSlots] = useState([]);

  useEffect(() => {
    const getSlots = async () => {
      const results = await getOccupiedSlots();
      setOccupiedSlots(results?.data);
    };
    getSlots();
  }, [getOccupiedSlots]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="container mx-auto space-y-8">
        {/* Heading Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Occupied Parking Slots
          </h1>
          <p className="text-xl text-gray-600">
            View all currently occupied parking slots
          </p>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
          <table className="min-w-full table-auto">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Parking ID</th>
                <th className="py-3 px-6 text-left">Slot ID</th>
                <th className="py-3 px-6 text-left">Location</th>
                <th className="py-3 px-6 text-left">User Name</th>
                <th className="py-3 px-6 text-left">User Id</th>
                <th className="py-3 px-6 text-left">Length</th>
                <th className="py-3 px-6 text-left">Width</th>
                <th className="py-3 px-6 text-left">Height</th>
              </tr>
            </thead>
            <tbody>
              {occupiedSlots?.map((slot) => (
                <tr
                  key={slot.parking_id}
                  className="hover:bg-gray-200 transition duration-200"
                >
                  <td className="py-3 px-6 text-gray-800">{slot.parking_id}</td>
                  <td className="py-3 px-6 text-gray-800">{slot.slot_no}</td>
                  <td className="py-3 px-6 text-gray-800">{slot.location}</td>
                  <td className="py-3 px-6 text-gray-800">{slot.user_name}</td>
                  <td className="py-3 px-6 text-gray-800">{slot.user_id}</td>
                  <td className="py-3 px-6 text-gray-800">{slot.length}</td>
                  <td className="py-3 px-6 text-gray-800">{slot.width}</td>
                  <td className="py-3 px-6 text-gray-800">{slot.height}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 ml-5">
        {!occupiedSlots ? "No Occupied slots" : ""}
        </p>
      </div>
    </div>
  );
};

export default OccupiedSlots;
