import React from "react";
import { Navigate } from "react-router-dom";

export function RoutesProtector({ children }) {
  const user = localStorage.getItem("user");

  if (user) {
    return children;
  } else {
    localStorage.removeItem("token")
    return <Navigate to="/" replace />;
  }
}

export function LoginProtector ({children}) {
  const user = localStorage.getItem("user");
  if(user){
    return <Navigate to="/Dashboard" replace />
  }else{
    return children;
  }
}