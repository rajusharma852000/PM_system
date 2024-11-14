const { userContext } = require("./Context");

const UserAction = (props) => {
    const host = "http://localhost:5000";

    const getRegisteredUsers = async () => {
        try { 
            const response = await fetch(`${host}/api/user/getUsers`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "admin-token": localStorage.getItem('admin-token'),
                }
            });
            const json = await response.json();
            if (!json.success) {
                throw new Error(json.message || 'failed fetching users details' );
            }
            return json;
        }
        catch (error) {
            console.log({ update: "Error getting user details", error: error });
            return;
        }
    }



    return (
        <>
            <userContext.Provider value={{getRegisteredUsers}}>
                {props.children}
            </userContext.Provider>
        </>
    )
}

export default UserAction;