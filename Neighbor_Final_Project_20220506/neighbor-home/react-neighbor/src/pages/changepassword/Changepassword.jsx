import axios from "axios";
import {useRef} from "react";
import "./changepassword.css";
// redirect user to previous pages
import {useNavigate} from "react-router";

export default function Changepassword() {
    const email=useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history=useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            password.current.setCustomValidity("Passwords don't match!")
        } 
        else{
            const user={
                email: email.current.value,
                password: password.current.value,
            }
            try{
                await axios.put(`/users/${user.email}`, {email: user.email,password: user.password});
                history("/login");
            }
            catch(err){
                console.log(err)
            }
        }
    }

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Reset Password</h3>
                <span className="loginDesc">Please provide correct email address<p><small>If you can successfully reset your password, you will be redirected to login page. Otherwise, you will be in this page.</small></p></span>
            </div>
            <div className="loginRight" onSubmit={handleClick}>
                <form className="loginBox">
                    <input placeholder="Email" type="Email" required ref={email} className="loginInput" />
                    <input placeholder="Password" type="password" required ref={password} minLength="6" className="loginInput" />
                    <input placeholder="Password Again" type="password" minLength="6" required ref={passwordAgain} className="loginInput" />
                    <button className="loginButton" type="submit">Reset Password</button>
                    
                </form>
            </div>
        </div>
    </div>
  )
}
