import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
function ProtectedRoutes() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/protected', {
          withCredentials: true,
        });
        setAuth(true);
      } catch (error) {
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [auth]);

  if (loading) return <div>Loading...</div>;

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;