import React from "react";

import { Navigate } from "react-router-dom";

function SecuredRoutes({ Component }) {
  const loggedin = sessionStorage.getItem("token") 

  return loggedin ? Component : <Navigate to="/" />;
}
export default SecuredRoutes;
