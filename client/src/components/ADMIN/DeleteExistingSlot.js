import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DeleteExistingSlot = () => {
  const navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem('admin-token')){
          navigate('/adminLogin');
      }
    },[]);
  const [slotId, setSlotId] = useState('')
  const [location, setLocation] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleDeleteClick = () => {
    // Show the confirmation modal
    setShowModal(true)
  }

  const handleConfirmDelete = () => {
    // Here you would typically send a request to delete the slot from the backend
    console.log(`Slot with ID: ${slotId} at location: ${location} has been deleted.`)
    // Close the modal and reset the form after deletion
    setShowModal(false)
    setSlotId('')
    setLocation('')
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Delete Existing Parking Slot</h1>
          <p className="text-xl text-gray-600">Fill in the details below to delete an existing parking slot</p>
        </div>

        {/* Form Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
          <form>
            {/* Slot ID */}
            <div>
              <label htmlFor="slot_id" className="block text-lg font-semibold text-gray-800 mb-2">Slot ID</label>
              <input
                type="text"
                id="slot_id"
                value={slotId}
                onChange={(e) => setSlotId(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Slot ID"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-lg font-semibold text-gray-800 mb-2">Parking Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Parking Location"
                required
              />
            </div>

            {/* Delete Button */}
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={handleDeleteClick}
                className="px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
              >
                Delete Slot
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Are you sure you want to delete this slot?</h2>
            <div className="space-x-4 text-center">
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition duration-300"
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

export default DeleteExistingSlot
