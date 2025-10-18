import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem("todoapp"));
    if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
