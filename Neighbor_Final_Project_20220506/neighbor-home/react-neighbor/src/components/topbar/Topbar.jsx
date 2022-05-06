import "./topbar.css"
import { AuthContext } from "../../context/AuthContext"
import {Link} from "react-router-dom"
import {useContext} from "react";
import {logoutCall} from '../../apiCalls'

export default function Topbar() {
  const { user,dispatch } = useContext(AuthContext);
  const PF =process.env.REACT_APP_PUBLIC_FOLDER;

  const handleClick = () => {
    logoutCall(
      dispatch
    );
  }

  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">Neighbor</span>
            </Link>
        </div>
        <div className="topbarCenter">
            <div className="searchbar">
                <i className="searchIcon fa-solid fa-magnifying-glass"></i>
                <input placeholder="Search for friends, post or video" className="searchInput" />
            </div>
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
                <span className="topbarLink">Homepage</span>
                <span className="topbarLink">Timeline</span>
            </div>
            <div className="topbarIcons">
                <div className="topbarIconItem">
                    <i className="fa-solid fa-user"></i>
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                    <i className="fa-brands fa-facebook-messenger"></i>
                    <span className="topbarIconBadge">2</span>
                </div>
                <div className="topbarIconItem">
                    <i className="fa-solid fa-bell"></i>
                    <span className="topbarIconBadge">1</span>
                </div>
                <Link to ={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF+user.profilePicture : PF+"testPerson/noAvatar.png"} alt="" className="topbarImg"/>
                </Link>
                <button className="loginOutButton" onClick={handleClick}>Sign out</button>
            </div>
        </div>
    </div>
  )
}
