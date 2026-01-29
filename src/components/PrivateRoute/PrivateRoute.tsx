import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  
  if (isRefreshing) return null;

  return !isLoggedIn ?<Navigate to="/login" replace />:  <Outlet />; 
}
