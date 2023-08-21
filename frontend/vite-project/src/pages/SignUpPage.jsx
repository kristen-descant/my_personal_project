import RegisterComp from "../components/RegisterComp.jsx";
import { api } from "./utilities.jsx";
import { useNavigate, useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";


export default function SignupPage() {

    const navigate = useNavigate();
    const {user, setUser,  userId, setUserId} = useOutletContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const {isSignUp, setIsSignUp} = useOutletContext();

    useEffect(() => {
        setIsSignUp(true);
    }, []);

    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    const signin = async (e) => {
        e.preventDefault();

        if (password !== verifyPassword) {
            window.alert("Passwords don't match!");
            return;
        }

        if (!password.match(passwordRegex)) {
            window.alert("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (e.g., @$!%*?&).");
            return;
        }

        if (!email.match(emailRegex)) {
            window.alert("Invalid email format!");
            return;
        }

        const lowercaseEmail = email.toLowerCase(); // Convert email to lowercase
        try {
            let response = await api.post("users/signup/", {
                email: lowercaseEmail, // Use the lowercase email
                password: password,
            });

            let user = response.data.user;
            let userid = response.data.id;
            let token = response.data.token;
            // Store the token securely (e.g., in localStorage or HttpOnly cookies)
            localStorage.setItem("token", token);
            api.defaults.headers.common["Authorization"] = `Token ${token}`;
            // set the user using with useContext to allow all other pages that need user information
            setUser(user);
            setUserId(userid)
            navigate("/");
           
        } catch(error) {
            window.alert(error.response['data'])
        };
    };

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])

    return (
        <>
        <div className="flex flex-row ml-8 mr-8 p-5 bg-white shadow-lg rounded-md">
            <div className="flex items-center flex-col">
                {!user &&
                <RegisterComp 
                includeVerifyPassword={true}
                setEmail={setEmail}
                setPassword={setPassword}
                setVerifyPassword={setVerifyPassword}
                signin={signin}
                isSignUp={isSignUp}/>
                }
            </div>
            <div className="ml-2 flex items-center">
                <p className="w-40 text-xs">Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character @$!%*?&.</p>
            </div>
        </div>
        </>
    )
}