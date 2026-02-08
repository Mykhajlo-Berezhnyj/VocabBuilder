import { useEffect, useState } from "react";
import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import UserBar from "../UserBar/UserBar";
import UserNav from "../UserNav/UserNav";
import css from "./AppBar.module.css";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import useWindowWidth from "../hook/useWindowWidth";

type AppBarProps = {
  className?: string;
};

export default function AppBar({ className }: AppBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isDestkop = width >= 1440;

  useEffect(() => {
    if (isDestkop) {
      queueMicrotask(() => setIsOpen((prev) => (prev ? false : prev)));
    }
  }, [isDestkop]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("User logout successes");
  };

  function handleCloseMenu() {
    setIsOpen(false);
  }

  function togleMenu() {
    setIsOpen((prev) => !prev);
  }

  return (
    <header className={className}>
      <Container className={css.containerHeader}>
        <Logo className={css.logo} />
        <UserNav
          className={clsx(css.userNav, css.userNavHeader)}
          handleLogout={handleLogout}
        />
        <UserBar
          className={css.userMenu}
          togleMenu={togleMenu}
          handleLogout={handleLogout}
        />

        {!isDestkop && (
          <div className={clsx(css.burgerMenu, isOpen && css.open)}>
            <UserBar
              isOpen={isOpen}
              variant="menu"
              togleMenu={togleMenu}
              handleLogout={handleLogout}
              className={clsx(css.userMenu, isOpen && css.open)}
            />
            <UserNav
              className={clsx(css.userNav, isOpen && css.open)}
              onCloseMenu={handleCloseMenu}
              handleLogout={handleLogout}
            />
          </div>
        )}
      </Container>
    </header>
  );
}
