import clsx from "clsx";
import css from "./UserNav.module.css";
import { NavLink, useSearchParams } from "react-router-dom";
import ButtonLogout from "../Button/ButtonLogout/ButtonLogout";

type UserNavProps = {
  className?: string;
  onCloseMenu?: () => void;
  handleLogout: () => void;
};

export default function UserNav({
  className,
  onCloseMenu = () => {},
  handleLogout,
}: UserNavProps) {
  const getActiveLinkClass = ({ isActive }: { isActive: boolean }) => {
    return clsx(css.link, isActive && css.active);
  };
  const [searchParams,] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const limit = params.get("limit") ?? "7";

  return (
    <nav className={className}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <NavLink
            to={`/dictionary?page=1&limit=${limit}`}
            className={getActiveLinkClass}
            aria-label="VocabBuilder Dictionary"
            onClick={() => onCloseMenu()}
          >
            Dictionary
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink
            to={`/recommend?page=1&limit=${limit}`}
            className={getActiveLinkClass}
            aria-label="VocabBuilder Recommend"
            onClick={() => onCloseMenu()}
          >
            Recommend
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink
            to="/training"
            className={getActiveLinkClass}
            aria-label="VocabBuilder Training"
            onClick={() => onCloseMenu()}
          >
            Training
          </NavLink>
        </li>
        <ButtonLogout onClick={handleLogout} className={css.btnLogout} />
      </ul>
    </nav>
  );
}
