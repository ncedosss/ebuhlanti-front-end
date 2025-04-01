import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import Request from "./components/request/Request";
import Requests from "./components/requests/Requests";
import Receivables from "./components/receivables/Receivables";
import Payments from "./components/payments/Payments";
import Premium from "./components/premium/Premium";
import Premiums from "./components/premiums/Premiums";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <div className="dashboard-wrapper">
              <Dashboard />
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <div className="dashboard-wrapper">
              <Request />
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <div className="dashboard-wrapper">
              <Requests />
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <div className="dashboard-wrapper">
              <Payments />
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <div className="dashboard-wrapper">
              <Premium />
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <div className="dashboard-wrapper">
              <Receivables />
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <div className="dashboard-wrapper">
              <Premiums />
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
