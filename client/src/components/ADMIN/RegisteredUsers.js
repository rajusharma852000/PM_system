import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom' // You can use Link to navigate to the vehicles page
import { userContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom'

const RegisteredUsers = () => {
  const navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem('admin-token')){
          navigate('/adminLogin');
      }
    },[]);
  const { getRegisteredUsers } = useContext(userContext);
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const getUsers = async() =>{
      const results = await getRegisteredUsers();
      setUsers(results?.data);
    }
    getUsers();
  }, [getRegisteredUsers])

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="container mx-auto space-y-8">
        {/* Heading Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Registered Users</h1>
          <p className="text-xl text-gray-600">View all registered users and their details</p>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">User ID</th>
                <th className="py-3 px-6 text-left">First Name</th>
                <th className="py-3 px-6 text-left">Last Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Phone No</th>
                <th className="py-3 px-6 text-left">DOB</th>
                <th className="py-3 px-6 text-left">Vehicles</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.user_id} className="hover:bg-gray-200 transition duration-200">
                  <td className="py-3 px-6 text-gray-800">{user.user_id}</td>
                  <td className="py-3 px-6 text-gray-800">{user.first_name}</td>
                  <td className="py-3 px-6 text-gray-800">{user.last_name}</td>
                  <td className="py-3 px-6 text-gray-800">{user.email}</td>
                  <td className="py-3 px-6 text-gray-800">{user.phone_no  || "NA"}</td>
                  <td className="py-3 px-6 text-gray-800">{user.dob?.split("T")[0]}</td>
                  <td className="py-3 px-6 text-center">
                    <Link
                      to={`/vehicles/${user.user_id}`} // Link to the vehicles page (you will create this page later)
                      className="px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-l transition duration-300"
                    >
                      View Vehicles
                    </Link>
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

export default RegisteredUsers;
