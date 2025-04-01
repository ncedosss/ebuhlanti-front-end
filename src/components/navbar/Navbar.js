import "./Navbar.css";
import avatar from "../../assets/avatar-svgrepo-com.svg";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  const { auth } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar__left">
        <a href="#" className={auth.role === "member" ? "active_link" : ""}>
          Members
        </a>
        <a href="#" className={auth.role === "admin" ? "active_link" : ""}>
          Admin
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
