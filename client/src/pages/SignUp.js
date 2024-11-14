import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/Context';


const SignUp = ({ login, setLogin }) => {
    const navigate = useNavigate();
    const { userSignUp } = useContext(authContext);
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        // Handle signup logic here (e.g., send data to the backend)
        await userSignUp({ firstName, secondName, password, email, dob, confirmPassword });

        console.log('Name:', firstName);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            navigate('/dashboard');
        }
    })

    return (
        <div className="flex justify-center items-center h-[95vh] background">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="name">
                            Firstname
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="name">
                            Secondname
                        </label>
                        <input
                            type="text"
                            id="secondName"
                            value={secondName}
                            onChange={(e) => setSecondName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="email">
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
                    <div className="mb-2">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="email">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="dob"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="password">
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
                    <div className="mb-2">
                        <label className="block text-gray-600 font-medium mb-1" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-500 text-sm mt-1">
                    Already have an account? <Link to='/' className="text-blue-500 hover:underline" onClick={() => setLogin(!login)}>Log in</Link>
                </p>

            </div>
        </div>
    );
};

export default SignUp;