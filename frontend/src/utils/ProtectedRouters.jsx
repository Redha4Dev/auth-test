import {Navigate , Outlet} from 'react-router-dom';

import React from 'react'

function ProtectedRouters() {
  const token = null
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRouters