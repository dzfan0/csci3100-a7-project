import "./share.css"
import{useContext,useRef,useState} from "react";
import {AuthContext} from "../../context/AuthContext"
import axios from "axios"
export default function Share() {
  const {user} =useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc=useRef();
  const [file,setFile]=useState(null);

  const submitHandler= async (e) =>{
      e.preventDefault();
      const newPost={
          userId: user._id,
          desc: desc.current.value,
      };
      if(file){
          const data= new FormData();
          const fileName = Date.now()+file.name;
          data.append("name",fileName);
          data.append("file", file);
          newPost.img = fileName;
          console.log(newPost);
          try{
            await axios.post("/upload",data)
          }
          catch(err){
              console.log(err);
          }
      }
      try{
        await axios.post("/posts",newPost)
        window.location.reload()
      }
      catch(err){
        console.log(err);
      }
  }

  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src={user.profilePicture? PF+user.profilePicture: PF+"testPerson/noAvatar.png"} alt="" />
                <input placeholder= {"What's in your mind " +user.username+"?"} className="shareInput" ref={desc}/>
            </div>
            <hr className="shareHr" />
            {file && (
                <div className="shareImgContainer">
                    <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                    <button className="shareCancelButton" onClick={()=>setFile(null)}>Cancel</button>
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <i className="shareIcon fa-solid fa-camera"></i>
                        <span className="shareOptionText">Photo or Video</span>
                        <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <i className="shareIcon fa-solid fa-tag"></i>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <i className="shareIcon fa-solid fa-location-dot"></i>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <i className="shareIcon fa-solid fa-face-smile"></i>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className="shareButton" type="submit">Share</button>
            </form>
        </div>
    </div>
  )
}
