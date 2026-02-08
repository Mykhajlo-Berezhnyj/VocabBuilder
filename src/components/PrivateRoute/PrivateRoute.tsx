import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Loader from "../Loader/Loader";

export default function PrivateRoute() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const location = useLocation();

  if (isRefreshing) return <Loader />;

  if (!isLoggedIn) {
    return (
      <Navigate
        to={`/login?returnUrl=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }
  return <Outlet />;
}
