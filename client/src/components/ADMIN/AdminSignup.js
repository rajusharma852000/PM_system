import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../context/Context';

const AdminSignup = () => {
  const { adminSignUp } = useContext(authContext);
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [secretKey, setSecretKey] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await adminSignUp({ firstName, secondName, password, email, dob, secretKey });
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-200 to-blue-500 flex items-center">
      <div className="w-full max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Create Admin Account</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* First Name and Last Name Fields Side by Side */}
          <div className="flex flex-col">
            <label className="text-white font-medium mb-1" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white font-medium mb-1" htmlFor="secondName">Second Name</label>
            <input
              type="text"
              id="secondName"
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email and Date of Birth Fields */}
          <div className="flex flex-col">
            <label className="text-white font-medium mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white font-medium mb-1" htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password and Confirm Password Fields */}
          <div className="flex flex-col">
            <label className="text-white font-medium mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Secret Key */}
          <div className="flex flex-col">
            <label className="text-white font-medium mb-1" htmlFor="secretKey">Secret Key</label>
            <input
              type="password"
              id="secretKey"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="col-span-2 mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-white text-sm mt-4">
          Already have an account?{' '}
          <Link to="/adminLogin" className="text-red-500 hover:underline">
            Log in
          </Link>
        </p>
        <p className="text-center text-sm mt-2 text-white">
          OR Login as an? <Link to='/' className="text-red-500 hover:underline " > USER</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
