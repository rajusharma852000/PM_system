import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RemoveUsers = () => {
  const navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem('admin-token')){
          navigate('/adminLogin');
      }
    },[]);
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleDeleteClick = () => {
    // Open the confirmation modal
    setShowModal(true)
  }

  const handleConfirmDelete = () => {
    // Here you can make the API call to delete the user
    console.log(`User with ID: ${userId} and Name: ${userName} is being deleted`)
    // Close the modal after deletion
    setShowModal(false)
    // Reset input fields
    setUserId('')
    setUserName('')
  }

  const handleCancelDelete = () => {
    // Close the modal without deleting
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="container mx-auto space-y-8">
        {/* Heading Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Remove User Account</h1>
          <p className="text-xl text-gray-600">Delete a user account by providing their ID and Name</p>
        </div>

        {/* Form Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2" htmlFor="user_id">
              User ID
            </label>
            <input
              type="text"
              id="user_id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter User ID"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2" htmlFor="user_name">
              User Name
            </label>
            <input
              type="text"
              id="user_name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter User Name"
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleDeleteClick}
              className="px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Confirm Deletion</h2>
            <p className="text-lg text-gray-600 text-center">
              Are you sure you want to delete the account for <strong>{userName}</strong> (ID: {userId})?
            </p>
            <div className="flex justify-around">
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RemoveUsers
