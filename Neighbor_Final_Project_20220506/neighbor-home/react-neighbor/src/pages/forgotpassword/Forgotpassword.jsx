import axios from "axios";
import {useRef} from "react";
import "./forgotpassword.css";

export default function Forgotpassword() {
    const email=useRef();

    const handleClick = async (e) => {
        e.preventDefault();
            const user={
                email: email.current.value,
            }
            try{
                await axios.put(`/auth/${user.email}`,{email: user.email});
            }
            catch(err){
                console.log(err)
            }
    }

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Forgot Password</h3>
                <span className="loginDesc">Please provide correct email address<p><small>You will receive an email for changing your password.</small></p></span>
            </div>
            <div className="loginRight" onSubmit={handleClick}>
                <form className="loginBox">
                    <input placeholder="Provide Your Email" type="Email" required ref={email} className="loginInput" />
                    <button className="loginButton" type="submit">Submit</button>
                    
                </form>
            </div>
        </div>
    </div>
  )
}
