import RegisterComp from "../components/RegisterComp.jsx";
import { api } from "./utilities.jsx";

export default function LoginPage() {

    return (
        <RegisterComp includeVerifyPassword={false}/>
    )
    
}