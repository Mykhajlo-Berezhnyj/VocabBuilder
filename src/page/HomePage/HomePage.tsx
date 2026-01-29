import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsRefreshing } from "../../redux/auth/selectors";

export default function HomePage() {
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) return null;
  return <Navigate to="/dictionary" />;
}
