import "./messenger.css"
import {format} from "timeago.js"
export default function Messenger() {
  return (
    <div className="login">
    <span className="loginTitle"><b>Go to Neighbor Chat Now!</b></span>
    <form className="loginForm">
        <a href="https://csci3100-a7-neighborchat.netlify.app/" className="button loginButton">Neighbor Chat</a>
        <a href="http://localhost:3000/" className="button loginRegisterButton">Home</a>

    </form>
</div>
  )
}