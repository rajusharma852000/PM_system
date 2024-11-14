import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'
const { carContext } = require("./Context");
const CarAction = (props) => {
    const navigate = useNavigate();
    const host = "http://localhost:5000";

    const addCar = async (carDetails) => {
        try { 
            const response = await fetch(`${host}/api/user/addCar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('auth-token'),
                },
                body: JSON.stringify(carDetails)
            });
            const json = await response.json();
            if (!json.success) {
                throw new Error(json.message || 'Add Car failed');
            }
            alert("Car added successfully");
            navigate('/dashboard');
        }
        catch (error) {
            console.log({ update: "Cannot register car", error: error });
            return;
        }
    }

    const getCars = async () => {
        try { 
            const response = await fetch(`${host}/api/user/getCars`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('auth-token'),
                }
            });
            const json = await response.json();
            if (!json.success) {
                throw new Error(json.message || 'Car fetching failed');
            }
            toast.success("Car Details Fetched");
            return json;
        }
        catch (error) {
            console.log({ update: "Cannot Fetched car", error: error });
            return;
        }
    }



    return (
        <>
            <carContext.Provider value={{ addCar,getCars}}>
                {props.children}
            </carContext.Provider>
        </>
    )
}

export default CarAction;