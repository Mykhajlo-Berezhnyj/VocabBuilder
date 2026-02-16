import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";
import { selectPerPage } from "../../redux/userDictionary/selectors";

export default function HomePage() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const limit = useSelector(selectPerPage);

  if (isRefreshing) return null;

  return isLoggedIn ? (
    <Navigate to={`/dictionary?page=1&limit=${limit}`} replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
