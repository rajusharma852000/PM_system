import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import { authContext } from '../context/Context';
const Login = ({ login, setLogin }) => {
    const navigate = useNavigate();
    const {userLogin} = useContext(authContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle login logic here (e.g., send data to the backend)
        await userLogin({email, password});
        console.log('Email:', email);
        console.log('Password:', password);
    };

    useEffect(()=>{
        if(localStorage.getItem('auth-token')){
            navigate('/dashboard');
        }
    })

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 background">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-600 font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Log In
                    </button>
                </form>
                <p className="text-center text-gray-500 text-sm mt-6">
                    Don't have an account? <Link to='/' className="text-blue-500 hover:underline" onClick={() => setLogin(!login)}>Sign up</Link>
                </p>
                <p className="text-center text-gray-500 text-sm mt-2">
                   OR Login as an  <Link to='/adminLogin' className="text-blue-500 hover:underline" > Admin</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;