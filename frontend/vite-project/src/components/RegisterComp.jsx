import React from "react";
import { Link } from "react-router-dom";

export default function RegisterComp({
        includeVerifyPassword,
        setEmail,
        setPassword,
        setVerifyPassword,
        signin,
        isSignUp
    }) {

    return (
        <>
        <div className="bg-white w-1/3 h-1/3 p-5 rounded md:h-1/2  flex flex-col justify-center overflow-hidden">
        <div className='flex flex-row justify-center overflow-hidden flex-nowrap mb-1'>
            {isSignUp ? 
            <div className="shadow-md lg:mb-2 md:mb-1 sm:mb-0 mb-1 flex-nowrap">Create an account or <Link className="rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" to="/login">Log In</Link></div> :
            <div className="shadow-md lg:mb-2 md:mb-1 mb-1 flex-nowrap">Enter credentials or <Link className="rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" to="/signup">Sign Up</Link></div> }
        </div>
        <form  onSubmit={signin}>
            <div className="flex flex-row justify-between overflow-hidden mb-1">
                <label htmlFor="email">email:</label>
                <input className="bg-blue-100 w-[70%]" type="text" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="flex flex-row justify-between overflow-hidden mb-1">
                <label htmlFor="password">password:</label>
                <input className="bg-blue-100 w-[70%]" type="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            {includeVerifyPassword &&
            <div className=" flex flex-row justify-between overflow-hidden mb-1">
                <label className="w-[30%]" htmlFor="verifypassword">verify password:</label>
                <input className="bg-blue-100 h-1/2 w-[70%]" type="password" onChange={(e) => setVerifyPassword(e.target.value)}/>
            </div>
            }
            <div className="flex justify-center">
            {includeVerifyPassword ? <button className="rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" type="submit">Create Account</button> :
            <button className="rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" type="submit">Log In</button>}
            </div>
        </form>
        </div>
        </>
    )
}