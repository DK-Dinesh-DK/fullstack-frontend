import React from "react";
import Header from "./Header";
import VehicleDetails from "../VehicleMangement/Vehicle Details";
import { Route, Routes } from "react-router-dom";
import UserDetails from "../VehicleMangement/User Details";

function AdminManagement() {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <Header />
      <Routes>
        <Route index element={<VehicleDetails />} />
        <Route path="/user-details" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default AdminManagement;
