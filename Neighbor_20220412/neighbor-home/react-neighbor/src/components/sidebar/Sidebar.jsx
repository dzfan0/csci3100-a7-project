import "./sidebar.css";
import {Link} from "react-router-dom"
export default function Sidebar() {
  const PF =process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
        <Link to="/" style={{textDecoration:"none"}}>
          <li className="sidebarListItem">
            <i className="sidebarIcon fa-solid fa-rss"></i>
            <span className="sidebarListItemText">Feed</span>
          </li>
        </Link>
        <Link to="/messenger" style={{textDecoration:"none"}}>
          <li className="sidebarListItem">
            <i className="sidebarIcon fa-brands fa-facebook-messenger"></i>
            <span className="sidebarListItemText">Chats</span>
          </li>
        </Link>
          <li className="sidebarListItem">
            <i className="sidebarIcon fa-solid fa-circle-play"></i>
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <i className="sidebarIcon fa-solid fa-user-group"></i>
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <i className="sidebarIcon fa-solid fa-bookmark"></i>
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <i className="sidebarIcon fa-solid fa-circle-question"></i>
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <i className="sidebarIcon fa-solid fa-school"></i>
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <h5 className="DSEList">DSE English pastpaper</h5>
        <a href={PF+"English/2021English.zip"}><button>2021 English </button></a>
        <a href={PF+"English/2020English.zip"}><button>2020 English </button></a>
        <a href={PF+"English/2019English.zip"}><button>2019 English </button></a>
        <a href={PF+"English/2018English.zip"}><button>2018 English </button></a>
        <a href={PF+"English/2017English.zip"}><button>2017 English </button></a>
        <a href={PF+"English/2016English.zip"}><button>2016 English </button></a>
        <a href={PF+"English/2015English.zip"}><button>2015 English </button></a>
        <a href={PF+"English/2014English.zip"}><button>2014 English </button></a>
        <a href={PF+"English/2013English.zip"}><button>2013 English </button></a>
        <h5 className="DSEList">DSE Chinese pastpaper</h5>
        <a href={PF+"Chinese/2019Chinese.zip"}><button>2019 Chinese </button></a>
        <a href={PF+"Chinese/2017Chinese.zip"}><button>2017 Chinese </button></a>
        <a href={PF+"Chinese/2016Chinese.zip"}><button>2016 Chinese </button></a>
        <a href={PF+"Chinese/2015Chinese.zip"}><button>2015 Chinese </button></a>
        <a href={PF+"Chinese/2014Chinese.zip"}><button>2014 Chinese </button></a>
        <a href={PF+"Chinese/2012Chinese.zip"}><button>2012 Chinese </button></a>
        <h5 className="DSEList">DSE Maths pastpaper</h5>
        <a href={PF+"Maths/2020Maths.zip"}><button>2020 Maths </button></a>
        <a href={PF+"Maths/2019Maths.zip"}><button>2019 Maths </button></a>
        <a href={PF+"Maths/2018Maths.zip"}><button>2018 Maths </button></a>
        <a href={PF+"Maths/2017Maths.zip"}><button>2017 Maths </button></a>
        <a href={PF+"Maths/2016Maths.zip"}><button>2016 Maths </button></a>
        <a href={PF+"Maths/2015Maths.zip"}><button>2015 Maths </button></a>
        <a href={PF+"Maths/2014Maths.zip"}><button>2014 Maths </button></a>
        <a href={PF+"Maths/2013Maths.zip"}><button>2013 Maths </button></a>
        <a href={PF+"Maths/2012Maths.zip"}><button>2012 Maths </button></a>
      </div>
    </div>
  )
}
