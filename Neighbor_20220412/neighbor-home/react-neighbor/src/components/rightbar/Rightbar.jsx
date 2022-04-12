import "./rightbar.css"
import {useEffect,useState,useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"

export default function Rightbar({user}){
  const PF =process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([])
  const {user:currentUser,dispatch} = useContext(AuthContext)
  const [ followed, setFollowed ] = useState(currentUser.followings.includes(user?._id) )
  
  useEffect(()=>{
    const getFriends =async()=>{
      try{
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      }
      catch(err){
        console.log(err);
      }
    };
    getFriends();
  },[user]);

  const handleClick =async()=>{
    try{
      if(followed){
        await axios.put(`/users/${user._id}/unfollow`, {userId:currentUser._id,});
        dispatch({type:"UNFOLLOW",payload:user._id})
      }else{
        await axios.put(`/users/${user._id}/follow`, {userId: currentUser._id,});
        dispatch({type:"FOLLOW",payload:user._id})
      }
      setFollowed(!followed)
    }
    catch(err){
      console.log(err);
    }
  }

  const HomeRightbar=()=>{
    return(
      <>
          <h3 className="rightbarTitle">
            <b>Learning English</b>
          </h3>
          <h4 className="rightbarTitle">
            English News (April 9)
          </h4>
          <video className="video" width="320" height="240" controls>
            <source src= {PF+"homevideos/april9.mp4"} type="video/mp4"/>
          </video>
          <h4 className="rightbarTitle">
            Learn English with Harry Potter
          </h4>
          <video className="video" width="320" height="240" controls>
            <source src= {PF+"homevideos/harrypotter.mp4"} type="video/mp4"/>
          </video>
          <h4 className="rightbarTitle">
            Learn English with Friends
          </h4>
          <video className="video" width="320" height="240" controls>
            <source src= {PF+"homevideos/friends.mp4"} type="video/mp4"/>
          </video>
          <h4 className="rightbarTitle">
            English Vocabularies Everyday
          </h4>
          <video className="video" width="320" height="240" controls>
            <source src= {PF+"homevideos/vocabs.mp4"} type="video/mp4"/>
          </video>
          
      </>
    )
  }

  const ProfileRightbar =()=>{
    return (
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow" }
        </button>
      )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Education: </span>
            <span className="rightbarInfoValue">{user.education ===1 ?"Primary": user.education ===2 ? "Secondary" : "University"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend)=>(
            <Link to={"/profile/" + friend.username} style={{textDecoration:"none"}}>
              <div className="rightbarFollowing">
                <img src={friend.profilePicture ? PF+friend.profilePicture : PF+ "testPerson/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
          
          
        </div>
      </>
    )
  }

  return (
    <div className="rightbar">
        <div className="rightbarWrapper">
          {user ? <ProfileRightbar/> : <HomeRightbar/>}
        </div>
    </div>
  )
}
