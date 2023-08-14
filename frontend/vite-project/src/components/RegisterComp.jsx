export default function RegisterComp({ includeVerifyPassword }) {
    return (
        <>
            <div className="signup">
                <form action="signupform">
                    <div>
                    <label htmlFor="email">email:</label>
                    <input type="text" />
                    </div>
                    <div>
                    <label htmlFor="password">password:</label>
                    <input type="text" />
                    </div>
                    {includeVerifyPassword &&
                    <div>
                    <label htmlFor="verifypassword">verify password:</label>
                    <input type="text" />
                    </div>
                    }
                    <button>Create Account</button>
                </form>
            </div>
        </>
    )
}