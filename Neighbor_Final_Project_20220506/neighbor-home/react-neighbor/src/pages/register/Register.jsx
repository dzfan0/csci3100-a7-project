import axios from "axios";
import {useRef} from "react";
import "./register.css";
import {Link} from "react-router-dom"
// redirect user to previous pages
import {useNavigate} from "react-router";

export default function Register() {
    const username = useRef();
    const email=useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history=useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            password.current.setCustomValidity("Passwords don't match!")
        } else{
            const user={
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try{
                await axios.post("/auth/register", user);
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
                <h3 className="loginLogo">Neighbor</h3>
                <span className="loginDesc">Whenever you encounter any diffculties on homework problems, don't hestitate to find us for help. We will try our best to help you.</span>
            </div>
            <div className="loginRight" onSubmit={handleClick}>
                <form className="loginBox">
                    <input placeholder="Username" required ref={username} className="loginInput" />
                    <input placeholder="Email" type="Email" required ref={email} className="loginInput" />
                    <input placeholder="Password" type="password" minLength="6" required ref={password} className="loginInput" />
                    <input placeholder="Password Again" type="password" minLength="6" required ref={passwordAgain} className="loginInput" />
                    <button className="loginButton" type="submit">Sign Up</button>
                    <button className="loginRegisterButton">Log into Account</button>
                    <Link to="/login" style={{textDecoration:"none"}}><button className="loginpagelink">Login Page</button></Link>
                    
                </form>
            </div>
        </div>
    </div>
  )
}
