import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function PublicRoute() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/dictionary";
  console.log("🚀 ~ PublicRoute ~ returnUrl:", returnUrl)

  if (isRefreshing) return <Loader />;

  return isLoggedIn ? <Navigate to={returnUrl} replace /> : <Outlet />;
}
