import React, { useContext, useState } from 'react';
import { carContext } from '../context/Context';
import {Link} from 'react-router-dom';


const AddCar = () => {
  const { addCar } = useContext(carContext);
  const [name, setName] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carNumber, setCarNumber] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    await addCar({ carNumber, name });
    console.log({ carNumber });
    console.log({ name });
  };

  return (
    <div className="grid grid-cols-12 h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      {/* Sidebar */}
      <div className="col-span-3 p-8 bg-indigo-500 text-white flex flex-col justify-between shadow-xl">
        <div>
          <h1 className="text-4xl font-bold mb-6">Car Management</h1>
          <p className="text-lg">Add, update, and manage your car details with ease.</p>
        </div>
        <ul className="space-y-4 mb-24">
          <li><Link to='/dashboard' className="hover:text-indigo-200 cursor-pointer">Dashboard</Link></li>
          <li><Link to='/bookslot' className="hover:text-indigo-200 cursor-pointer">Book Parking Slot</Link></li>
          <li><Link to='#' className="hover:text-indigo-200 cursor-pointer">Settings</Link></li>
        </ul>
      </div>

      {/* Form Section */}
      <div className="col-span-9 p-12 flex flex-col justify-start items-start">
        <h2 className="text-3xl font-semibold text-indigo-700 mb-8">Add New Car</h2>
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-3xl">
          <form onSubmit={handleSave} className="space-y-8">
            {/* Car Name */}
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2" htmlFor="name">
                Car Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
                placeholder="Enter car name"
              />
            </div>

            {/* Car Model */}
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2" htmlFor="carModel">
                Car Model
              </label>
              <input
                type="text"
                id="carModel"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
                placeholder="Enter car model"
              />
            </div>

            {/* Car Number */}
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2" htmlFor="carNumber">
                Car Number
              </label>
              <input
                type="text"
                id="carNumber"
                value={carNumber}
                onChange={(e) => setCarNumber(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
                placeholder="Enter car number"
              />
            </div>

            {/* Car Image */}
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2" htmlFor="carImage">
                Car Image
              </label>
              <input
                type="file"
                id="carImage"
                className="w-full p-4 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out"
              >
                Save Car
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
