import { useContext, useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Main from "../main/Main";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Request from "../request/Request";
import Payment from "../payment/Payment";
import Requests from "../requests/Requests";
import Receivables from "../receivables/Receivables";
import Payments from "../payments/Payments";
import Premium from "../premium/Premium";
import Premiums from "../premiums/Premiums";

const Dashboard = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const { auth } = useContext(AuthContext); // Get the auth context
  const navigate = useNavigate(); // For navigation
  const [showRequest, setShowRequest] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showReceivables, setShowReceivables] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showPremiums, setShowPremiums] = useState(false);

  const openSideBar = () => {
    setSideBarOpen(true);
  };

  const closeSideBar = () => {
    setSideBarOpen(false);
  };

  useEffect(() => {
    // Redirect if not authenticated
    if (!Object.keys(auth).length) {
      navigate("/login", { replace: true }); // Redirect to login if no access token
    }
  }, [auth, navigate]); // Depend on auth and navigate

  const handleAddRequestClick = () => {
    setShowRequest(true);
    setShowPayment(false);
    setShowRequests(false);
    setShowReceivables(false);
    setShowPayments(false);
    setShowPremium(false);
    setShowPremiums(false);
  };

  const handleDashboardClick = () => {
    setShowRequest(false);
    setShowPayment(false);
    setShowRequests(false);
    setShowReceivables(false);
    setShowPayments(false);
    setShowPremium(false);
    setShowPremiums(false);
  };

  const handleAllRequestsClick = () => {
    setShowRequest(false);
    setShowPayment(false);
    setShowRequests(true);
    setShowReceivables(false);
    setShowPayments(false);
    setShowPremium(false);
    setShowPremiums(false);
  };

  const handleAllReceivablesClick = () => {
    setShowRequest(false);
    setShowPayment(false);
    setShowRequests(false);
    setShowReceivables(true);
    setShowPayments(false);
    setShowPremium(false);
    setShowPremiums(false);
  };

  const handleAddPaymentClick = () => {
    setShowRequest(false);
    setShowPayment(true);
    setShowRequests(false);
    setShowReceivables(false);
    setShowPayments(false);
    setShowPremium(false);
    setShowPremiums(false);
  };

  const handleAllPaymentsClick = () => {
    setShowRequest(false);
    setShowPayment(false);
    setShowRequests(false);
    setShowReceivables(false);
    setShowPayments(true);
    setShowPremium(false);
    setShowPremiums(false);
  };

  const handleAddPremiumsClick = () => {
    setShowRequest(false);
    setShowPayment(false);
    setShowRequests(false);
    setShowReceivables(false);
    setShowPremium(true);
    setShowPayments(false);
    setShowPremiums(false);
  };

  const handleShowPremiumsClick = () => {
    setShowRequest(false);
    setShowPayment(false);
    setShowRequests(false);
    setShowReceivables(false);
    setShowPremium(false);
    setShowPayments(false);
    setShowPremiums(true);
  };

  return (
    <div className="container">
      <Navbar sidebarOpen={sideBarOpen} openSidebar={openSideBar} />
      {showRequest ? (
        <Request />
      ) : showRequests ? (
        <Requests />
      ) : showPayment ? (
        <Payment />
      ) : showPayments ? (
        <Payments />
      ) : showPremium ? (
        <Premium />
      ) : showPremiums ? (
        <Premiums />
      ) : showReceivables ? (
        <Receivables />
      ) : (
        <Main
          handleAddRequestClick={handleAddRequestClick}
          handleDashboardClick={handleDashboardClick}
          handleAddPaymentClick={handleAddPaymentClick}
          handleAllRequestsClick={handleAllRequestsClick}
          handleAllReceivablesClick={handleAllReceivablesClick}
          handleAllPaymentsClick={handleAllPaymentsClick}
          handleAddPremiumsClick={handleAddPremiumsClick}
          handleShowPremiumsClick={handleShowPremiumsClick}
          showRequest={showRequest}
          setShowRequest={setShowRequest}
          showPayment={showPayment}
          setShowPayment={showPayment}
          showRequests={showRequests}
          setShowRequests={showRequests}
          showReceivables={showReceivables}
          setShowReceivables={showReceivables}
          showPayments={showPayments}
          setShowPayments={showPayments}
          showPremium={showPremium}
          setShowPremium={showPremium}
          showPremiums={showPremiums}
          setShowPremiums={showPremiums}
        />
      )}
      <Sidebar
        sidebarOpen={sideBarOpen}
        closeSidebar={closeSideBar}
        onAddRequestClick={handleAddRequestClick}
        onDashboardClick={handleDashboardClick}
        onAddPaymentClick={handleAddPaymentClick}
        onShowAllRequests={handleAllRequestsClick}
        onShowAllReceivables={handleAllReceivablesClick}
        onShowAllPayments={handleAllPaymentsClick}
        onAddPremiumsClick={handleAddPremiumsClick}
        onShowAllPremiums={handleShowPremiumsClick}
      />
    </div>
  );
};

export default Dashboard;
