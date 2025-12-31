import { useEffect, useState } from "react";
import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import UserBar from "../UserBar/UserBar";
import UserNav from "../UserNav/UserNav";
import css from "./AppBar.module.css";
import clsx from "clsx";

type AppBarProps = {
  className?: string;
};

export const isDestkop = window.innerWidth >= 1440;

export default function AppBar({ className }: AppBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (isDestkop) {
        setIsOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, ["resize"]);

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
        <UserNav className={clsx(css.userNav, css.userNavHeader)} />
        <UserBar className={css.userMenu} togleMenu={togleMenu} />

        <div className={clsx(css.burgerMenu, isOpen && css.open)}>
          <UserBar
            isOpen={isOpen}
            variant="menu"
            togleMenu={togleMenu}
            className={clsx(css.userMenu, isOpen && css.open)}
          />
          <UserNav
            className={clsx(css.userNav, isOpen && css.open)}
            onCloseMenu={handleCloseMenu}
          />
        </div>
      </Container>
    </header>
  );
}
