import { useState,useContext } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);
  const {currentUser}=useContext(AuthContext);
  
  const fetch=useNotificationStore(state=>state.fetch);
  const number=useNotificationStore(state=>state.number);
  if(currentUser) fetch();
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>LamaEstate</span>
        </a>
        <a href="/profile">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={currentUser.avatar||"/noavatar.png"}
              alt=""
            />
            <span>{currentUser.username}</span>
            <a href="/profile" className="profile">
              {number>0 &&<div className="notification">{number}</div>}
              <span>Profile</span>
            </a>
          </div>
        ) : (
          <>
            <a href="/login"><button>Sign in</button></a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/profile">Home</a>
          <a href="/profile">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
