import React, { Children } from 'react'
import { Navigate } from "react-router-dom";

const ProtectionRoutes = ({children}) => {
  // const Navigate = ;
  const access_token = localStorage.getItem("login_token")
  console.log(access_token);
  
  return access_token ? children : <Navigate to={"/login"} />
}

export default ProtectionRoutes;