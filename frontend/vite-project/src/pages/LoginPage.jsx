import { api } from "./utilities.jsx";

export default function LoginPage() {

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
                    <button>Create Account</button>
                </form>
            </div>
        </>
    )
    
}