import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"
const { authContext } = require("./Context");

const AuthAction = (props) => {

    const navigate = useNavigate();
    const host = "http://localhost:5000";


    const userSignUp = async ({ firstName, secondName, password, email, dob }) => {
        try {
            const response = await fetch(`${host}/api/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Add this line
                },
                body: JSON.stringify({ firstName, secondName, password, email, dob })
            });
            const json = await response.json();
            if (!json.success) {
                throw new Error(json.message || 'Signup failed');
            }
            localStorage.setItem('auth-token', json.authToken);
            navigate('/dashboard');
        }
        catch (error) {
            console.log({ update: "Cannot create account", error: error });
            return;
        }
    }

    const userLogin = async (credentials) => {
        try {
            const response = await fetch(`${host}/api/user/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            const json = await response.json();

            if (!json.success) {
                throw new Error(json.message || 'Login failed');
            }
            localStorage.setItem('auth-token', json.authToken);
            navigate('/dashboard');
        }
        catch (error) {
            console.log({ update: "Cannot login", error: error });
            return;
        }
    }

    const getUserDetails = async () => {
        try {
            const response = await fetch(`${host}/api/user/getUserDetails`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('auth-token'),
                },
            })
            const json = await response.json();

            if (!json.success) {
                throw new Error(json.message || 'User Details Not Fetched');
            }
            toast.success("User Details Fetched");
            return json;
        }
        catch (error) {
            console.log({ update: "Cannot Fetched User Details", error: error });
            return;
        }
    }

    const updateUser = async (details) => {
        try {
            const response = await fetch(`${host}/api/user/updateUser`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('auth-token'),
                },
                body : JSON.stringify(details)
            })
            const json = await response.json();

            if (!json.success) {
                throw new Error(json.message || 'User Details Not Updated');
            }
            toast.success("User Details Updated");
        }
        catch (error) {
            console.log({ update: "Cannot Update User Details", error: error });
            return;
        }
    }

    const adminSignUp = async ({firstName, secondName, password, email, dob, secretKey}) => {
        try {
            const response = await fetch(`${host}/api/user/adminSignup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Add this line
                },
                body: JSON.stringify({firstName, secondName, password, email, dob, secretKey})
            });
            const json = await response.json();
            if (!json.success) {
                throw new Error(json.message || 'Signup failed');
            }
            localStorage.setItem('admin-token', json.authToken);
            navigate('/admin');
        }
        catch (error) {
            console.log({ update: "Cannot create account", error: error });
            return;
        }
    }


    const adminLogin = async (credentials) => {
        try {
            const response = await fetch(`${host}/api/user/adminLogin`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            const json = await response.json();

            if (!json.success) {
                throw new Error(json.message || 'Login failed');
            }
            localStorage.setItem('admin-token', json.authToken);
            navigate('/admin');
        }
        catch (error) {
            console.log({ update: "Cannot login", error: error });
            return;
        }
    }



    return (
        <>
            <authContext.Provider value={{ userSignUp, userLogin, getUserDetails, updateUser, adminLogin, adminSignUp }}>
                {props.children}
            </authContext.Provider>
        </>
    )
}

export default AuthAction;