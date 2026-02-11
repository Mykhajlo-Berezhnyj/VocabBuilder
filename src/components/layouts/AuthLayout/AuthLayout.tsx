import { Outlet } from "react-router-dom";
import Logo from "../../Logo/Logo";
import css from "./AuthLayout.module.css";

export default function AuthLayout() {
  return (
    <>
      <Logo className={css.logo} />
      <main className={css.main}>
        <Outlet />
      </main>
    </>
  );
}
