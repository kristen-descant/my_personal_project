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
            <div className=" w-full mt-8 mb-8 flex flex-no-wrap flex-col items-center justify-center h-3/4 bg-white rounded">
                <form className="h-full flex items-center" onSubmit={updateUserInfo} >
                <div className="flex flex-col justify-around h-1/2">
                    <div className="flex flex-row justify-between" >
                        <label htmlFor="newEmail">New Email:</label>
                        <input className="border border-black rounded text-center" type="text" value={newEmail} onChange={handleEmailChange} />
                    </div>
                    <div className="flex flex-row justify-between">
                        <label htmlFor="oldPassword">Old Password:</label>
                        <input className="border border-black rounded text-center" type="password" value={oldPassword} onChange={handleOldPasswordChange} />
                    </div>
                    <div className="flex flex-row justify-between">
                        <label htmlFor="newPassword">New Password:</label>
                        <input className="border border-black rounded text-center" type="password" value={newPassword} onChange={handleNewPasswordChange} />
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-sky-700 hover:bg-sky-900 border border-black text-white w-1/2 rounded" type="submit">Submit</button>
                    </div>
                </div>
                </form>
            </div>
        </>
    )
}