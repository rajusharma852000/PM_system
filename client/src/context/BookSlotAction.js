import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const { bookSlotContext } = require("./Context");

const BookSlotAction = (props) => {
    const navigate = useNavigate();
    const host = "http://localhost:5000";

    const bookSlot = async ({fromTime,toTime,isEmpty,parking_id,car_id}) => {
        try { 
            const response = await fetch(`${host}/api/user/bookSlot`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('auth-token'),
                },
                body : JSON.stringify({fromTime,toTime,isEmpty,parking_id,car_id})

            });
            const json = await response.json();
            if (!json?.success){
                throw new Error(json.message || 'Slot Not Booked');
            }
            // alert("Slot Booked");
            navigate('/dashboard');
            toast.success("Slot Booked");
            return;
        }
        catch (error) {
            console.log({ update: "Cannot Booked Slot", error: error });
            return;
        }
    }



    return (
        <>
            <bookSlotContext.Provider value={{ bookSlot}}>
                {props.children}
            </bookSlotContext.Provider>
        </>
    )
}

export default BookSlotAction;