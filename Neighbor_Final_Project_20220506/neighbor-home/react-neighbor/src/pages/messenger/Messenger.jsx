import "./messenger.css"
export default function Messenger() {
  return (
    <div className="login">
    <span className="loginTitle"><b>Go to Neighbor Chat Now!</b></span>
    <span><small><b>Since we are using free trial of the getStreamAPI, the expired date of Neighbor Chat Link is 10 May 2022.</b></small></span>
    <form className="loginForm">
        <a href="https://csci3100-a7-neighborchat.netlify.app/" className="button loginButton">Neighbor Chat</a>
        <a href="http://localhost:3030/" className="button loginButton">Neighbor Zoom Chat</a>
        <a href="http://localhost:3000/" className="button loginRegisterButton">Home</a>

    </form>
</div>
  )
}