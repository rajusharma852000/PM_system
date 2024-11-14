import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({login,setLogin}) => {
  const navigate = useNavigate();
  return (
    <nav className="bg-blue-500 p-2 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Parking Management
        </Link>
        {
            localStorage.getItem('auth-token')?(<div className="space-x-4">
                    <Link to="/dashboard" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
                        Dashboard
                    </Link>
                    <Link to="/bookslot" className="text-white hover:bg-blue-700 px-3 py-2 rounded">
                        Book Parking Slot
                    </Link>
                    <button className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
                    onClick={()=>{
                      localStorage.removeItem("auth-token");;
                      navigate('/');
                      }}>
                        Logout
                    </button>
                </div>):
                (<div className="space-x-4">
                    <Link to="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded text-2xl" onClick={()=>{
                        if(!login) setLogin(true);
                    }}>
                        Log In
                    </Link>
                </div>)
        }
      </div>
    </nav>
  );
};

export default Navbar;