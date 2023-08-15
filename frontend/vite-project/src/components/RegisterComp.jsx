export default function RegisterComp({
        includeVerifyPassword,
        setEmail,
        setPassword,
        setVerifyPassword,
        signUp,
    }) {
    return (
        <>
            <div className="signup">
                <form onSubmit={signUp}>
                    <div>
                    <label htmlFor="email">email:</label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                    <label htmlFor="password">password:</label>
                    <input type="text" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {includeVerifyPassword &&
                    <div>
                    <label htmlFor="verifypassword">verify password:</label>
                    <input type="text" onChange={(e) => setVerifyPassword(e.target.value)}/>
                    </div>
                    }
                    <button type="submit">Create Account</button>
                </form>
            </div>
        </>
    )
}