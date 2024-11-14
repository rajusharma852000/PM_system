import toast from "react-hot-toast";

// import { useNavigate } from "react-router-dom";
const { getParkingSlotContext } = require("./Context");

const GetParkingSlotAction = (props) => {
    const host = "http://localhost:5000";

    const getParkingSlot = async ({location}) => {
        try {
            const response = await fetch(`${host}/api/user/getParkingSlot`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({location})
            });
            const json = await response.json();
            if (!json?.success) {
                throw new Error(json.message || 'Cannot Get Parking Slot');
            }
            toast.success("Slot Fetched")
            return json;
        }
        catch (error) {
            console.log({ update: "Cannot Fetched Parking Slot", error: error });
            return;
        }
    }

    return (
        <>
            <getParkingSlotContext.Provider value={{getParkingSlot}}>
                {props.children}
            </getParkingSlotContext.Provider>
        </>
    )
}

export default GetParkingSlotAction;