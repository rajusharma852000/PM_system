const { slotContext } = require("./Context");

const SlotAction = (props) => {
    const host = "http://localhost:5000";




    const getEmptySlots = async () => {
        try { 
            const response = await fetch(`${host}/api/user/getEmptySlots`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "admin-token": localStorage.getItem('admin-token'),
                }
            });
            const json = await response.json();
            if (!json.success) {
                throw new Error(json.message || 'failed fetching empty slots details' );
            }
            return json;
        }
        catch (error) {
            console.log({ update: "Error getting empty slots details", error: error });
            return;
        }
    }



    const getOccupiedSlots = async () => {
        try { 
            const response = await fetch(`${host}/api/user/getOccupiedSlots`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "admin-token": localStorage.getItem('admin-token'),
                }
            });
            const json = await response.json();
            if (!json.success) {
                throw new Error(json.message || 'failed fetching occupied slots details' );
            }
            return json;
        }
        catch (error) {
            console.log({ update: "Error getting occupied slots details", error: error });
            return;
        }
    }


    const createSlot = async () => {
        try { 
            const response = await fetch(`${host}/api/user/createSlot`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "admin-token": localStorage.getItem('admin-token'),
                }
            });
            const json = await response.json();
            if (!json.success) {
                throw new Error(json.message || 'Slot creation failed' );
            }
            return json;
        }
        catch (error) {
            console.log({ update: "Error while creating new slot", error: error });
            return;
        }
    }



    return (
        <>
            <slotContext.Provider value={{getEmptySlots, getOccupiedSlots, createSlot}}>
                {props.children}
            </slotContext.Provider>
        </>
    )
}

export default SlotAction;