import React, { useState } from "react";
import { api } from "./utilities";
import { useOutletContext } from "react-router";

export default function UserSettingsPage() {
    const {user} = useOutletContext();
    const [newEmail, setNewEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

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
            <div className="aProperty">
                <h3>Update Information</h3>
                <form onSubmit={updateUserInfo} >
                    <div>
                        <label htmlFor="newEmail">New Email:</label>
                        <input type="text" value={newEmail} onChange={handleEmailChange} />
                    </div>
                    <div>
                        <label htmlFor="oldPassword">Old Password:</label>
                        <input type="password" value={oldPassword} onChange={handleOldPasswordChange} />
                    </div>
                    <div>
                        <label htmlFor="newPassword">New Password:</label>
                        <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}