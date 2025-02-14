import {Navigate , Outlet} from 'react-router-dom';

import React from 'react'

function ProtectedRouters() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRouters