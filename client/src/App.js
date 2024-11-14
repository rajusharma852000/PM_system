import Login from './pages/Login';
import './App.css';
import SignUp from './pages/SignUp';
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AuthAction from './context/AuthAction';
import CarAction from './context/CarAction';
import Navbar from './pages/Navbar';
import Dashboard from './pages/Dashboard';
import AddCar from './pages/AddCar';
import BookSlot from './components/BookSlot';
import EditProfile from './components/EditProfile';
import GetParkingSlotAction from './context/GetParkingSlot';
import BookSlotAction from './context/BookSlotAction';
import AdminLogin from './components/ADMIN/AdminLogin';
import Admin from './components/ADMIN/Admin';
import EmptySlots from './components/ADMIN/EmptySlots';
import RegisteredUsers from './components/ADMIN/RegisteredUsers';
import RestrictUsers from './components/ADMIN/RestrictUsers';
import RemoveUsers from './components/ADMIN/RemoveUsers';
import ViewParkingLocation from './components/ADMIN/ViewParkingLocation';
import OccupiedSlots from './components/ADMIN/OccupiedSlots';
import CreateNewSlot from './components/ADMIN/CreateNewSlot';
import DeleteExistingSlot from './components/ADMIN/DeleteExistingSlot';
import Slots from './components/ADMIN/Slots';
import RegisteredCars from './components/ADMIN/RegisteredCars';
import AdminSignup from './components/ADMIN/AdminSignup';
import UserAction from "./context/UserAction";
import SlotAction from "./context/SlotAction";

function App() {
  const [login, setLogin] = useState(true);
  const location = useLocation();

  // Array of admin paths where Navbar should not be shown
  const adminPaths = [
    '/adminLogin',
    '/adminSignup',
    '/admin',
    '/registeredUsers',
    '/restrictUsers',
    '/removeUser',
    '/parkingLocations',
    '/emptySlots',
    '/occupiedSlots',
    '/createParkingSlot',
    '/deleteParkingSlot',
    '/slots',
    '/registeredCars'
  ];

  // Check if the current path is an admin path
  const isAdminPath = adminPaths.includes(location.pathname);

  return (
    <>
      <UserAction>
        <SlotAction>
          <AuthAction>
            <CarAction>
              <GetParkingSlotAction>
                <BookSlotAction>
                  {/* Conditionally render Navbar */}
                  {!isAdminPath && <Navbar login={login} setLogin={setLogin} />}
                  <Routes>
                    {login ? (
                      <Route path='/' element={<Login login={login} setLogin={setLogin} />} />
                    ) : (
                      <Route path='/' element={<SignUp login={login} setLogin={setLogin} />} />
                    )}
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/addCar' element={<AddCar />} />
                    <Route path='/bookslot' element={<BookSlot />} />
                    <Route path='/editprofile' element={<EditProfile />} />
                    <Route path='/adminSignup' element={<AdminSignup />} />
                    <Route path='/adminLogin' element={<AdminLogin />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/registeredUsers' element={<RegisteredUsers />} />
                    <Route path='/restrictUsers' element={<RestrictUsers />} />
                    <Route path='/removeUser' element={<RemoveUsers />} />
                    <Route path='/parkingLocations' element={<ViewParkingLocation />} />
                    <Route path='/emptySlots' element={<EmptySlots />} />
                    <Route path='/occupiedSlots' element={<OccupiedSlots />} />
                    <Route path='/createParkingSlot' element={<CreateNewSlot />} />
                    <Route path='/deleteParkingSlot' element={<DeleteExistingSlot />} />
                    <Route path='/slots' element={<Slots />} />
                    <Route path='/registeredCars' element={<RegisteredCars />} />
                  </Routes>
                </BookSlotAction>
              </GetParkingSlotAction>
            </CarAction>
          </AuthAction>
        </SlotAction>
      </UserAction>
    </>
  );
}

export default App;
