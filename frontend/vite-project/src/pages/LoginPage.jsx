import RegisterComp from "../components/RegisterComp.jsx";
import { api } from "./utilities.jsx";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

export default function LoginPage(props) {

    const navigate = useNavigate();
    const {user, setUser} = useOutletContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    const signin = async (e) => {
        e.preventDefault();

        let response = await api.post("users/login/", {
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
            {!user ?
            <RegisterComp 
            includeVerifyPassword={false}
            setEmail={setEmail}
            setPassword={setPassword}
            setVerifyPassword={setVerifyPassword}
            signin={signin}/>
            :
            navigate('/')}
        </>
    )
    
}