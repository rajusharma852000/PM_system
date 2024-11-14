import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import "../index.css";
import { getParkingSlotContext, carContext } from '../context/Context';
import { bookSlotContext } from '../context/Context';

const BookSlot = () => {
    const [location, setLocation] = useState("select");
    const [car, setCar] = useState({});
    const [dimensions, setDimensions] = useState({ length: 0, width: 0, height: 0 });
    const [slotsVisible, setSlotsVisible] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState({});
    const [slots, setSlots] = useState([]);
    const [carSaved, setCarSaved] = useState([]);
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime ] = useState('');
    // const navigate = useNavigate();
    const { getParkingSlot } = useContext(getParkingSlotContext);
    const { bookSlot } = useContext(bookSlotContext);
    const { getCars } = useContext(carContext);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const carTemp = await getCars();
                setCarSaved(carTemp.data);
            } catch (error) {
                console.error("Failed to fetch cars:", error);
            }
        };

        fetchCars();
    }, []);

    // Handlers
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
        if (event.target.value === "select") {
            setSlotsVisible(false);
            setSlots([]);
        }
    };

    const handleCarChange = (event) => {
        const selectedCarModel = event.target.value;
        const selectedCar = carSaved.find(car => car.car_name === selectedCarModel);
        setCar(selectedCar);
        if (selectedCar && selectedCarModel !== "select") {
            setDimensions({
                length: parseFloat(selectedCar.length),
                width: parseFloat(selectedCar.width),
                height: parseFloat(selectedCar.height),
            });
        }
        else {
            setDimensions({ length: 0, width: 0, height: 0 });
            setSlotsVisible(false);
            setSlots([]);
        }
    };

    const handleCheckSlots = async (event) => {
        event.preventDefault();
        const slotTemp = await getParkingSlot({ location });
        setSlotsVisible(true);
        setSlots(slotTemp?.data);
    };
    const setDimensionsEntered = (event) => {
        const { name, value } = event.target;
        setDimensions((prevDimensions) => ({
            ...prevDimensions,
            [name]: Number(value),
        }));
    };

    const handleSubmit = async() => {
        const isEmpty = selectedSlot.isEmpty;
        const parking_id = selectedSlot.parking_id;
        const car_id = car.car_id;
        await bookSlot({fromTime,toTime,isEmpty,parking_id,car_id});
    };

    return (
        <div className="flex w-full h-[110vh] left-0 top-0 overflow-x-hidden">
            {/* 1st Column */}
            <div className='w-[45%] bg-yellow-50 h-[100%] flex flex-col items-center'>
                <h3 className={`bg-slate-600 px-6 py-2 rounded-lg mt-10 text-white font-bold text-2xl w-[78%] flex justify-startt`}>
                    Car Details</h3>
                {/* Choose location to park car */}
                <div className="h-16 flex justify-startt items-center w-[74%] mt-8">
                    <select
                        name="location"
                        className="bg-orange-600 hover:bg-orange-700  text-white py-3 px-8 m-3 text-2xl rounded-lg w-96"
                        value={location}
                        onChange={handleLocationChange}
                    >
                        <option value="select">Select: Parking Location</option>
                        <option value="IITG Lake/Estate Building">IITG Lake/Estate Building</option>
                        <option value="Guest House">Guest House</option>
                        <option value="IITG Hospital">Hospital</option>
                    </select>
                </div>

                {/* Choose Car to be parked */}
                <div className="h-16 flex justify-startt items-center w-[74%] mt-3">
                    <select
                        name="location"
                        className={`bg-yellow-500 text-blacks py-3 px-8 m-3 text-2xl rounded-lg w-96 ${location === "select" ? "opacity-50 cursor-not-allowed bg-slate-500" : "hover:bg-yellow-400"}`}
                        onChange={handleCarChange}
                        value={car?.car_name}
                        disabled={location === "select"}
                    >
                        <option value="select">Select: Car</option>
                        {carSaved.map((car, index) => (
                            <option value={car.car_name} key={index}> {car.car_name} </option>
                        ))}
                    </select>
                </div>


                <div className="h-auto flex flex-col justify-center items-start w-[70%] mt-2">
                    {/* Enter dimensions */}
                    <label htmlFor="length" className={`font-bold text-[1.5rem] ${location !== "select" && car !== "select" ? "" : "opacity-50 cursor-not-allowed "}`}>Length(m):
                        <input
                            type="number"
                            id="length"
                            value={dimensions.length === 0 ? "Enter length" : dimensions.length}
                            name="length"
                            className={`p-2 mb-2 border-2 bg-orange-200 px-8 text-xl m-2 py-3 w-60 ${location !== "select" && car !== "select" ? "border-black" : "opacity-50 cursor-not-allowed "}`}
                            placeholder="Enter length"
                            required
                            onChange={setDimensionsEntered}
                            disabled={location === "select"}
                        />
                    </label>
                    <label htmlFor="width" className={`font-bold text-[1.5rem] ${location !== "select" && car !== "select" ? "" : "opacity-50 cursor-not-allowed "}`}>Width(m) :
                        <input
                            type="number"
                            id="width"
                            value={dimensions.width === 0 ? "Enter length" : dimensions.width}
                            name="width"
                            className={`p-2 mb-2 border-2 bg-orange-200 px-8 text-xl m-2 py-3 w-60 ${location !== "select" && car !== "select" ? "border-black" : "opacity-50 cursor-not-allowed "}`}
                            placeholder="Enter width"
                            required
                            onChange={setDimensionsEntered}
                            disabled={location === "select"}
                        />
                    </label>
                    <label htmlFor="height" className={`font-bold text-[1.5rem] ${location !== "select" && car !== "select" ? "" : "opacity-50 cursor-not-allowed "}`}>Height(m):
                        <input
                            type="number"
                            id="height"
                            value={dimensions.height === 0 ? "Enter length" : dimensions.height}
                            name="height"
                            className={`p-2 mb-2 border-2 bg-orange-200 px-8 text-xl m-2 py-3 w-60 ${location !== "select" && car !== "select" ? "border-black" : "opacity-50 cursor-not-allowed "}`}
                            placeholder="Enter height"
                            required
                            onChange={setDimensionsEntered}
                            disabled={location === "select"}
                        />
                    </label>

                    <div className='w-[74%] flex justify-center'>
                        <button
                            className={`bg-red-600 text-white px-6 py-3 rounded-lg mt-6 ${(car !== "select" && location !== "select")
                                ? "hover:bg-red-700"
                                : "opacity-50 cursor-not-allowed"
                                }`}
                            onClick={handleCheckSlots}
                            disabled={(car === "select" || location === "select")}
                        >
                            Check Available Slots
                        </button>
                    </div>

                </div>
            </div>

            {/* 2nd Column */}
            <div className='w-[55%] h-full flex flex-col items-center bg-[#fdf4eb]'>
                <>
                    {/* Available slots */}
                    <h3 className={`px-6 py-2 rounded-lg text-white font-bold text-2xl mt-10 w-[74%] flex justify-start ${!slotsVisible ? "opacity-50 cursor-not-allowed bg-slate-500" : "bg-slate-600"}`}
                        disabled={!slotsVisible}>
                        Available Slots</h3>
                    <div className="flex flex-wrap justify-start p-4 pl-12 rounded-lg w-[86%] bg-transparent h-auto">
                        {slots?.map((slot, index) => (
                            <div
                                key={index}
                                className={`h-20 w-36 m-4 rounded-lg flex justify-center items-center text-white cursor-pointer 
                                    ${!slotsVisible
                                        ? "opacity-50 cursor-not-allowed bg-slate-500"
                                        : (slot.isEmpty
                                            ? (selectedSlot === slot
                                                ? "bg-blue-500" // Selected slot
                                                : "bg-green-500 hover:bg-green-600") // Empty slot
                                            : "opacity-50 cursor-not-allowed bg-red-500")}
                                    `}
                                onClick={() => {
                                    if (slot.isEmpty) {
                                        // setSlotsVisible(true);
                                        setSelectedSlot(slot);  // Select the entire slot object
                                    }
                                }}
                                disabled={!slotsVisible}
                            >
                                {/* Conditionally render the tick mark or the slot number */}
                                {selectedSlot === slot ? (
                                    <FaCheck className="text-white text-4xl" />  // Display a large tick mark when selected
                                ) : (
                                    <div>
                                        <span className="text-lg font-semibold">{slot.slot_no}</span> {/* Show the slot number */}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <span className='text-xl text-black w-[70%]'>
                        <strong> &#x25A0; Selected Slot:</strong> {!selectedSlot ? "None" : selectedSlot.slot_no}
                    </span>

                    {/* From and To inputs */}
                    <h3 className={`px-6 py-2 rounded-lg text-white font-bold text-2xl mt-6 w-[74%] flex justify-start ${!slotsVisible ? "opacity-50 cursor-not-allowed bg-slate-500" : "bg-slate-600"}`}
                        disabled={!slotsVisible}>
                        Time and Duration</h3>
                    <div className="flex items-center mt-4">
                        <label htmlFor="length" className='font-bold text-[1.5rem]'>From:
                            <input
                                type="datetime-local"
                                id="from"
                                name="from"
                                className={`p-2 mb-2 border rounded bg-orange-200 text-black px-5 text-xl m-2 py-3 w-64 ${!slotsVisible ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={!slotsVisible}
                                required
                                value={fromTime}
                                onChange={(e) => setFromTime(e.target.value)}
                            />
                        </label>
                        <label htmlFor="length" className='font-bold text-[1.5rem]'>To:
                            <input
                                type="datetime-local"
                                id="to"
                                name="to"
                                className={`p-2 mb-2 border rounded bg-orange-200 text-black px-5 text-xl m-2 py-3 w-64 ${!slotsVisible ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={!slotsVisible}
                                required
                                value={toTime}
                                onChange={(e) => setToTime(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="flex items-center mt-10">
                        <button
                            className={`bg-orange-500 text-white px-6 py-3 rounded-lg mt-4 ${!slotsVisible ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"}`}
                            onClick={handleSubmit}
                            disabled={!slotsVisible}
                        >
                            Confirm Booking
                        </button>
                    </div>
                </>
            </div>

        </div>
    );
};

export default BookSlot;

