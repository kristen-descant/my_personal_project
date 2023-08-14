import { api } from "./utilities.jsx";
import { useNavigate } from "react-router-dom";


export default function SignupPage() {

    const navigate = useNavigate();

    const signUp = async (e) => {
    e.preventDefault();
    let response = await api.post("users/signup/", {
        email: email,
        password: password,
    });
    let user = response.data.user;
    let token = response.data.token;
    // Store the token securely (e.g., in localStorage or HttpOnly cookies)
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    // set the user using with useContext to allow all other pages that need user information
    setUser(user);
    navigate("/");
    };


    return (
        <>
            <div className="signup">
                <form action="signupform">
                    <div>
                    <label htmlFor="email">email:</label>
                    <input type="text" />
                    </div>
                    <div>
                    <label htmlFor="password">password:</label>
                    <input type="text" />
                    </div>
                    <div>
                    <label htmlFor="verifypassword">verify password:</label>
                    <input type="text" />
                    </div>
                    <button>Create Account</button>
                </form>
            </div>
        </>
    )
}