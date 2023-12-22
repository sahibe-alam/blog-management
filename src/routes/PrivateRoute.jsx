import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn')

  if (!isLoggedIn) {
    navigate('/login'); 
  }

  return <Outlet />; 
};
