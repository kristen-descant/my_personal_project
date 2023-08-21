import React, { useEffect, useState } from "react";
import { api } from "./utilities";
import { useOutletContext } from "react-router";

export default function UserSettingsPage() {
    const {user, setPageDescrip} = useOutletContext();
    const [newEmail, setNewEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        setPageDescrip('Settings')
    })

    const updateUserInfo = async (e) => {

        e.preventDefault();

        try {
            const response = await api.put('users/settings/', {
                email: newEmail,
                old_password: oldPassword,
                new_password: newPassword
            });

            console.log(response)

        } catch(error) {
            console.log(error);
        };
    };

    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    return (
        <>
            <div className="flex flex-col justify-evenly text-center ml-20 pl-20 mt-20">
                <form onSubmit={updateUserInfo} >
                    <div className="text-right m-2">
                        <label htmlFor="newEmail">New Email:</label>
                        <input type="text" value={newEmail} onChange={handleEmailChange} />
                    </div>
                    <div className="text-right m-2">
                        <label htmlFor="oldPassword">Old Password:</label>
                        <input type="password" value={oldPassword} onChange={handleOldPasswordChange} />
                    </div>
                    <div className="text-right m-2">
                        <label htmlFor="newPassword">New Password:</label>
                        <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
                    </div>
                    <button className="hover:bg-blue-200" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}