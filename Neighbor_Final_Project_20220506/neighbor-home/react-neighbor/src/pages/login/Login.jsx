import {useContext, useRef} from "react";
import "./login.css";
import {Link} from "react-router-dom"
import {loginCall} from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext";
export default function Login() {
  const email = useRef();
  const password = useRef();
  const {user, isFetching,error,dispatch} = useContext(AuthContext);


  const handleClick = (e)=>{
      e.preventDefault()
      loginCall({email:email.current.value,password:password.current.value}, dispatch);
  };

  console.log(user);

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Neighbor</h3>
                <span className="loginDesc">Whenever you encounter any diffculties on homework problems, don't hestitate to find us for help. We will try our best to help you.</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email"type="Email" required className="loginInput" ref={email}/>
                    <input placeholder="password" type="Password" required minLength="6" className="loginInput" ref={password} />
                    <button className="loginButton" type="submit" disabled={isFetching}>
                        {isFetching ? "loading" : "Log In"}
                    </button>
                    <Link to="/forgotpassword" style={{textDecoration:"none"}}><span className="loginForgot">Forgot Password?</span></Link>
                    <button className="loginRegisterButton">
                        {isFetching ? "loading" : "Create a New Account"}
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
