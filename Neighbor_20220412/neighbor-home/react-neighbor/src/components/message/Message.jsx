import "./message.css"
import {format} from "timeago.js"
export default function Message({message,own}) {
  return (
    <div className= "messenger">
      <p>Please go to our new Neighbor Chat Website.</p>
      <input type="button" onclick="location.href='https://google.com';" value="Go to Google" />
    </div>
  )
}
