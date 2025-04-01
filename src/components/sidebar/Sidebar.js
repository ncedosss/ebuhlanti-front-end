import "./Sidebar.css";
import logo from "../../assets/logo.PNG";
import Login from "../Login";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
const Sidebar = ({
  sidebarOpen,
  closeSidebar,
  onAddRequestClick,
  onDashboardClick,
  onAddPaymentClick,
  onShowAllRequests,
  onShowAllReceivables,
  onShowAllPayments,
  onAddPremiumsClick,
  onShowAllPremiums,
}) => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const { auth } = useContext(AuthContext);

  const handleLogout = () => {
    setAuth({});
    navigate("/login");
  };
  return (
    <>
      {showLogin ? (
        <Login />
      ) : (
        <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
          <div className="sidebar__title">
            <div className="sidebar__img">
              <img src={logo} alt="logo" />
            </div>
            <i
              className="fa fa-times"
              id="sidebarIcon"
              onClick={() => closeSidebar()}
            ></i>
          </div>
          <div className="sidebar__menu">
            <div className="sidebar__link active_menu_link">
              <i className="fa fa-home"></i>
              <a href="#" onClick={onDashboardClick}>
                Dashboard
              </a>
            </div>
            {auth.role === "admin" && (
              <>
                <h2>ADMIN</h2>
                <div className="sidebar__link">
                  <i className="fa fa-plus"></i>
                  <a href="#" onClick={onAddRequestClick}>
                    Add Request
                  </a>
                </div>
                <div className="sidebar__link">
                  <i className="fa fa-money"></i>
                  <a href="#" onClick={onAddPaymentClick}>
                    Add Payment
                  </a>
                </div>
                <div className="sidebar__link">
                  <i className="fa fa-money"></i>
                  <a href="#" onClick={onAddPremiumsClick}>
                    Add Premiums
                  </a>
                </div>
              </>
            )}
            <h2>ALL MEMBERS</h2>
            <div className="sidebar__link">
              <i className="fa fa-money"></i>
              <a href="#" onClick={onShowAllPremiums}>
                All Premiums
              </a>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-line-chart"></i>
              <a href="#" onClick={onShowAllRequests}>
                All Requests
              </a>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-money"></i>
              <a href="#" onClick={onShowAllPayments}>
                All Payments
              </a>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-university"></i>
              <a href="#" onClick={onShowAllReceivables}>
                Receivables
              </a>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-power-off"></i>
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
