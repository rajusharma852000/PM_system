import React, { useContext, useEffect, useState } from 'react';
import pic1 from '../material/Scorpio.webp';
import pic2 from '../material/Parking_car.jpg';
import CarCard from './CarCard';
import { Link, useNavigate } from 'react-router-dom';
import { carContext, authContext } from '../context/Context';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      navigate('/');
    }
  });

  const { getCars } = useContext(carContext);
  const { getUserDetails } = useContext(authContext);
  const [carSaved, setCarSaved] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carTemp = await getCars();
        const userTemp = await getUserDetails();
        setUser(userTemp?.data);
        setCarSaved(carTemp?.data);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-100 via-white to-indigo-200 flex flex-col gap-8">
      {/* Profile Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col items-center">
          <img
            src={pic2}
            alt="Profile"
            className="rounded-full w-28 h-28 mb-6 shadow-md border-2 border-indigo-500"
          />
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">{user[0]?.first_name}</h2>
          <p className="text-lg text-gray-600 mb-1">{user[0]?.phone_no}</p>
          <p className="text-lg text-gray-600">{user[0]?.email}</p>
          <div className="flex mt-6 space-x-4">
            <Link
              to={`/editprofile`}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Edit Profile
            </Link>
            <Link
              to={'/addCar'}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Add Car
            </Link>
          </div>
        </div>

        {/* Car List Section */}
        <div className="col-span-2 bg-white p-8 rounded-3xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Your Cars</h1>
          <div className="flex flex-wrap gap-6 justify-center">
            {carSaved?.length ? (
              carSaved.map((car, index) => (
                <CarCard key={index} image={pic1} name={car.car_name} />
              ))
            ) : (
              <p className="text-lg text-gray-500">No cars added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
