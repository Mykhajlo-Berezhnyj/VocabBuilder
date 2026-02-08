import { Outlet } from "react-router-dom";
import Logo from "../../Logo/Logo";
import css from "./AuthLayout.module.css";

type AuthLayoutProps = {
  className?: string;
};

export default function AuthLayout({ className }: AuthLayoutProps) {
  return (
    <>
      <Logo className={css.logo} />
      <main className={css.main}>
        <Outlet />
      </main>
    </>
  );
}
