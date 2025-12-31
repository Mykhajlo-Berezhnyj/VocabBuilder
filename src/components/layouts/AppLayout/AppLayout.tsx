import { Outlet } from "react-router-dom";
import AppBar from "../../AppBar/AppBar";
import css from "./AppLayout.module.css";

type AppLayoutProps = {
  className?: string;
};

export default function AppLayout({ className }: AppLayoutProps) {
  return (
    <>
      <AppBar className={className} />
      <main className={css.main}>
        <Outlet />
      </main>
    </>
  );
}
