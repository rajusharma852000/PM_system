import React, { useContext, useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake } from 'react-icons/fa';
import { AiOutlineCamera } from 'react-icons/ai';
import { authContext } from '../context/Context';

const EditProfile = () => {
  // State variables for user data
  const [profileImage, setProfileImage] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const { getUserDetails, updateUser } = useContext(authContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserDetails();
        setPhoneNumber(user.data[0]?.phone_no || "N.A.");
        setDateOfBirth(user.data[0]?.dob?.split("T")[0]);
        setFirstName(user.data[0]?.first_name);
        setLastName(user.data[0]?.last_name);
        setEmail(user.data[0]?.email);
      } catch (e) {
        console.log("Error in User Details : ", e);
      }
    }
    fetchUser();
  }, []);

  // Handlers
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    console.log("object");
    await updateUser({ first_name: firstName, last_name: lastName, email, dob: dateOfBirth, phone_no: phoneNumber });
  }

  return (
    <div className=" bg-white p-10 text-black relative">
      {/* Title Section */}
      <h1 className="text-4xl font-bold mb-8 text-center">Edit Your Profile</h1>


      {/* Profile Picture Section */}
      <div className="relative z-10 flex justify-center mb-10">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-500 text-2xl">
              <FaUser className="text-white opacity-70" />
            </div>
          )}
          <label
            htmlFor="profile-image-upload"
            className="absolute bottom-0 right-0 bg-pink-500 p-2 rounded-full cursor-pointer hover:bg-pink-600 transition"
          >
            <AiOutlineCamera className="text-white " />
          </label>
          <input
            type="file"
            id="profile-image-upload"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="relative z-10 grid grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* First Name */}
        <div className="flex items-center space-x-3 bg-white/20 rounded-lg p-4 shadow-lg">
          <FaUser className="text-yellow-300 text-3xl" />
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="bg-transparent border-b-2 border-yellow-300 text-black text-2xl placeholder-slate-400 focus:outline-none focus:border-yellow-500 w-full"
          />
        </div>

        {/* Last Name */}
        <div className="flex items-center space-x-3 bg-white/20 rounded-lg p-4 shadow-lg">
          <FaUser className="text-pink-300 text-3xl" />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            className="bg-transparent border-b-2 border-pink-300 text-black text-2xl placeholder-slate-400 focus:outline-none focus:border-pink-500 w-full"
          />
        </div>

        {/* Email */}
        <div className="flex items-center space-x-3 bg-white/20 rounded-lg p-4 shadow-lg col-span-2">
          <FaEnvelope className="text-blue-300 text-3xl" />
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-transparent border-b-2 border-blue-300 text-black text-2xl placeholder-slate-400 focus:outline-none focus:border-blue-500 w-full"
          />
        </div>

        {/* Phone Number */}
        <div className="flex items-center space-x-3 bg-white/20 rounded-lg p-4 shadow-lg">
          <FaPhone className="text-green-300 text-3xl" />
          <input
            type="tel"
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            className="bg-transparent border-b-2 border-green-300 text-black text-2xl placeholder-slate-400 focus:outline-none focus:border-green-500 w-full"
          />
        </div>

        {/* Date of Birth */}
        <div className="flex items-center space-x-3 bg-white/20 rounded-lg p-4 shadow-lg">
          <FaBirthdayCake className="text-purple-300 text-3xl" />
          <input
            type="date"
            onChange={(e) => setDateOfBirth(e.target.value)}
            value={dateOfBirth}
            className="bg-transparent border-b-2 border-purple-300 text-black/70 text-2xl placeholder-slate-400 focus:outline-none focus:border-purple-500 w-full"
          />
        </div>
        {/* Save Button */}
      </div>

      <div className="text-center mt-10 cursor-pointer hover:scale-105 w-[full]">
        <button className="px-10 py-3 bg-red-500 hover:bg-red-800 text-white text-2xl font-bold rounded-full shadow-lg transition cursor-pointer" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>

    </div>
  );
};

export default EditProfile;
