import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
    const navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem('admin-token')){
          navigate('/adminLogin');
      }
    },[]);
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <button className='bg-red-500 text-white py-2 px-4 m-2 rounded-lg absolute block right-10 hover:bg-red-600'
      onClick={()=>{localStorage.removeItem("admin-token");;
        navigate('/adminLogin')
      }}
      >Logout</button>
      <div className="container mx-auto space-y-8">
        {/* Heading Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
          <p className="text-xl text-gray-600">Manage parking slots and users</p>
        </div>

        {/* Feature Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Registered Users</h2>
            <p className="text-gray-600">View and manage all registered users</p>
            <button className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={()=>{navigate('/registeredUsers')}}>
              View Users
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Restrict User Account</h2>
            <p className="text-gray-600">Temporarily restrict a user's account</p>
            <button className="mt-4 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300"
            onClick={()=>{navigate('/restrictUsers')}}>
              Restrict Account
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Remove User Account</h2>
            <p className="text-gray-600">Permanently remove a user's account</p>
            <button className="mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
            onClick={()=>{navigate('/removeUser')}}>
              Remove Account
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Parking Locations</h2>
            <p className="text-gray-600">View available parking locations</p>
            <button className="mt-4 px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition duration-300"
            onClick={()=>{navigate('/parkingLocations')}}>
              View Locations
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Empty Slots</h2>
            <p className="text-gray-600">See the number of available parking slots</p>
            <button className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
            onClick={()=>{navigate('/emptySlots')}}>
              View Empty Slots
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Occupied Slots</h2>
            <p className="text-gray-600">See the number of currently occupied parking slots</p>
            <button className="mt-4 px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition duration-300"
            onClick={()=>{navigate('/occupiedSlots')}}>
              View Occupied Slots
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Slot</h2>
            <p className="text-gray-600">Add a new parking slot to the system</p>
            <button className="mt-4 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
            onClick={()=>{navigate('/createParkingSlot')}}>
              Create Slot
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delete Existing Slot</h2>
            <p className="text-gray-600">Remove an existing parking slot</p>
            <button className="mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
            onClick={()=>{navigate('/deleteParkingSlot')}}>
              Delete Slot
            </button>
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default Admin
