import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";

export default function HomePage() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isRefreshing) return null;

  return isLoggedIn ? (
    <Navigate to="/dictionary" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
