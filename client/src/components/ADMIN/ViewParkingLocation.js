import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const ViewParkingLocation = () => {
  const navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem('admin-token')){
          navigate('/adminLogin');
      }
    },[]);
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="container mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Available Parking Locations</h1>
          <p className="text-xl text-gray-600">Choose a parking location to view available slots.</p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Hospital */}
          <div className="bg-blue-500 text-white rounded-lg shadow-lg p-6 hover:scale-105 transform transition duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4">Hospital</h2>
            <p className="text-lg mb-6">A convenient parking spot for hospital visitors. Safe and secure parking.</p>
            <Link 
              to="/slots" 
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              View Slots
            </Link>
          </div>

          {/* Card 2: Guest House */}
          <div className="bg-green-500 text-white rounded-lg shadow-lg p-6 hover:scale-105 transform transition duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4">Guest House</h2>
            <p className="text-lg mb-6">Ample parking spaces available near the guest house for guests and visitors.</p>
            <Link 
              to="/slots" 
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
            >
              View Slots
            </Link>
          </div>

          {/* Card 3: IITG Lake/Estate Building */}
          <div className="bg-yellow-500 text-white rounded-lg shadow-lg p-6 hover:scale-105 transform transition duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4">IITG Lake/Estate Building</h2>
            <p className="text-lg mb-6">Explore parking options near the IITG Lake and Estate building areas.</p>
            <Link 
              to="/slots" 
              className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-300"
            >
              View Slots
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewParkingLocation;
