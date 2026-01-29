import { useDispatch } from "react-redux";
import Icon from "../../Icon/Icon";
import Button from "../Button";
import css from "./ButtonLogout.module.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/auth/operations";
import type { AppDispatch } from "../../../redux/store";
import clsx from "clsx";

type ButtonLogoutProps = {
  className?: string;
};

export default function ButtonLogout({ className }: ButtonLogoutProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/register");
  };

  return (
    <Button className={clsx(css.btnLogout ,className)} onClick={handleLogout}>
      Log out <Icon iconName="arrow-right" className={css.icon} />
    </Button>
  );
}
