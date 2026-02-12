import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import css from "../PrivateRoute/PrivateRoute.module.css";

export default function PublicRoute() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/dictionary";

  if (isRefreshing)
    return <Loader className={css.loader} loadName="Verifying user…" />;

  return isLoggedIn ? <Navigate to={returnUrl} replace /> : <Outlet />;
}
