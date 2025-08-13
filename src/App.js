import logo from "./logo.svg";
import "./App.css";
import Login from "./Component/Authentication/login/login";
import Register from "./Component/Authentication/Register/Register";
import ForgotPassword from "./Component/Authentication/Forgot/ForgotPassword";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import AdminManagement from "./Component/adminManagement";
import UserDetails from "./Component/VehicleMangement/User Details";
import VehicleDetails from "./Component/VehicleMangement/Vehicle Details";
import SecuredRoutes from "./route/SecuredRoutes";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/forgotpassowrd"
            element={<ForgotPassword />}
          />
          <Route
            path="/dashboard-table/*"
            element={<SecuredRoutes Component={<AdminManagement />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
