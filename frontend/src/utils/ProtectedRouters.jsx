import {Navigate , Outlet} from 'react-router-dom';

import React from 'react'

function ProtectedRouters() {
    const user = true
  return user ? <Outlet/> : <Navigate to={"/login"}/>;
}

export default ProtectedRouters