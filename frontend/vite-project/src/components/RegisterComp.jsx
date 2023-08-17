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
                    <div>
                        <label htmlFor="email">email:</label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">password:</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {includeVerifyPassword &&
                    <div>
                        <label htmlFor="verifypassword">verify password:</label>
                        <input type="password" onChange={(e) => setVerifyPassword(e.target.value)}/>
                    </div>
                    }
                    {includeVerifyPassword ? <button type="submit">Create Account</button> :
                    <button type="submit">Log In</button>}
                </form>
            </div>
        </>
    )
}