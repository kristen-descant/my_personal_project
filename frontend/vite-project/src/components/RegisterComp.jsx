import React from "react";

export default function RegisterComp({
        includeVerifyPassword,
        setEmail,
        setPassword,
        setVerifyPassword,
        signin,
    }) {

    return (
        <>
            <div className="signin">
                <form onSubmit={signin}>
                    <div className="flex justify-between m-2">
                        <label htmlFor="email">email:</label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="flex justify-between m-2">
                        <label htmlFor="password">password:</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {includeVerifyPassword &&
                    <div className="text-right m-2">
                        <label htmlFor="verifypassword">verify password:</label>
                        <input type="password" onChange={(e) => setVerifyPassword(e.target.value)}/>
                    </div>
                    }
                    <div className="flex justify-center">
                    {includeVerifyPassword ? <button type="submit">Create Account</button> :
                    <button type="submit">Log In</button>}
                    </div>
                </form>
            </div>
        </>
    )
}