import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
//import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import avtar from "../../image/profile.png"
import Logo from "../../image/Logo.png"


const Navbar = () => {
  const [profile, setProfile] = useState(false);
  const { currentUser, logout,set,OffSidebar } = useContext(AuthContext);

  const Profile = () => {
    return (
      <div className="profile_modal">
        <div className="profile_item">
          <Link to="/about-us" className="itm">
            <span>About Us</span>
          </Link>
        </div>
        <div className="profile_item" onClick={logout}>
          <span>Logout </span>
          <LogoutIcon />
        </div>
      </div>
    );
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link onClick={OffSidebar} to="/"  style={{ textDecoration: "none" }}>
           <img className="logo" src={Logo} alt="" />
        </Link>
         <Link onClick={OffSidebar} to="/" className="hm" > <HomeOutlinedIcon className="homebtn" fontSize="large" /></Link>
        <GridViewOutlinedIcon fontSize="large" />
      </div>

      <div className="right">
        <div
          className="profile"
          onClick={() => {
            setProfile(!profile);
          }}
        >
          <img
            className="profile_img"
            src={avtar}
            alt=""
          />
          <span className="name">{currentUser?.username}</span>
          {profile && <Profile />}
        </div>
       
      </div>
    </div>
  );
};

export default Navbar;
