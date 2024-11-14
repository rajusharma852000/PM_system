import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateNewSlot = () => {
  const navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem('admin-token')){
          navigate('/adminLogin');
      }
    },[]);
  const [parkingId, setParkingId] = useState('')
  const [slotId, setSlotId] = useState('')
  const [location, setLocation] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [isEmpty, setIsEmpty] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would normally send the data to the backend API
    const newSlot = {
      parking_id: parkingId,
      slot_id: slotId,
      location,
      length,
      width,
      height,
      isEmpty,
    }
    console.log('New Parking Slot:', newSlot)

    // Reset the form after submission
    setParkingId('')
    setSlotId('')
    setLocation('')
    setLength('')
    setWidth('')
    setHeight('')
    setIsEmpty(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="container mx-auto space-y-8">
        {/* Heading Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Create New Parking Slot</h1>
          <p className="text-xl text-gray-600">Fill in the details below to create a new parking slot</p>
        </div>

        {/* Form Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
          <form onSubmit={handleSubmit}>
            {/* Parking ID */}
            <div>
              <label htmlFor="parking_id" className="block text-lg font-semibold text-gray-800 mb-2">Parking ID</label>
              <input
                type="text"
                id="parking_id"
                value={parkingId}
                onChange={(e) => setParkingId(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Parking ID"
                required
              />
            </div>

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
              <label htmlFor="location" className="block text-lg font-semibold text-gray-800 mb-2">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Location"
                required
              />
            </div>

            {/* Length */}
            <div>
              <label htmlFor="length" className="block text-lg font-semibold text-gray-800 mb-2">Length (in meters)</label>
              <input
                type="number"
                id="length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Length"
                required
              />
            </div>

            {/* Width */}
            <div>
              <label htmlFor="width" className="block text-lg font-semibold text-gray-800 mb-2">Width (in meters)</label>
              <input
                type="number"
                id="width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Width"
                required
              />
            </div>

            {/* Height */}
            <div>
              <label htmlFor="height" className="block text-lg font-semibold text-gray-800 mb-2">Height (in meters)</label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Height"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center mt-6">
              <button
                type="submit"
                className="px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-300"
              >
                Create Slot
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateNewSlot
