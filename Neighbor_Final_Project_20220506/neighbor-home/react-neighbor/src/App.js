import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Messenger from "./pages/messenger/Messenger"
import Verifyemail from "./pages/verifyemail/Verifyemail";
import Changepassword from "./pages/changepassword/Changepassword";
import Forgotpassword from "./pages/forgotpassword/Forgotpassword";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// In react, it cannot have multiple tags so it must use div or <> to contain the tags.
function App() {
  const {user} =useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route path="/" element={user? <Home/> : <Register/>} />
        <Route path="/register" element={user? <Navigate replace to="/"/> : <Register/>} />
        <Route path="/messenger" element={!user? <Navigate replace to="/"/> : <Messenger/>} />
        <Route path="/login" element={user? <Navigate replace to="/"/> : <Login/>} />
        <Route path="/profile/:username" element={<Profile/>} />
        <Route path="/verify-email" element={<Verifyemail/>} />
        <Route path="/user/:email" element={<Changepassword/>}/>
        <Route path="/forgotpassword" element={<Forgotpassword/>}/>
      </Routes>
    </Router>
  );
}

export default App;
