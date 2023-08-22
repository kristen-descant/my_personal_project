import RegisterComp from "../components/RegisterComp.jsx";
import { api } from "./utilities.jsx";
import { useNavigate, useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import logo from '../media/houseLogo.png'

export default function LoginPage(props) {

    const navigate = useNavigate();
    const {user, setUser, userId, setUserId} = useOutletContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const {isSignUp, setIsSignUp} = useOutletContext();

    useEffect(() => {
        setIsSignUp(false);
    }, []);

    const signin = async (e) => {
        try {
            e.preventDefault();

            const lowercaseEmail = email.toLowerCase(); // Convert email to lowercase
            let response = await api.post("users/login/", {
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
            console.log(error);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data;
                alert(errorMessage); // Display the error message in an alert
            }

        };
        
        };

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])

    return (
        <>
        <div className="h-3/4 w-3/4 mr-8 ml-8 border-8 flex flex-col justify-evenly items-center border-white bg-zinc-800 shadow-2xl rounded-md">
            <div>
                <img className="w-20 h-20" src={logo} alt="house logo" />
            </div>
            <div className="text-white text-4xl">REInvestmentPro</div>
            {!user &&
            <RegisterComp 
            includeVerifyPassword={false}
            setEmail={setEmail}
            setPassword={setPassword}
            setVerifyPassword={setVerifyPassword}
            signin={signin}
            isSignUp={isSignUp}/>
            }
        </div>
        </>
    )
    
}