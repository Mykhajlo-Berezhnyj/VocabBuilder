import clsx from "clsx";
import css from "./UserNav.module.css";
import { NavLink } from "react-router-dom";
import ButtonLogout from "../Button/ButtonLogout/ButtonLogout";

type UserNavProps = {
  className?: string;
  onCloseMenu?: () => void;
  handleLogout: ()=>void;
};

export default function UserNav({
  className,
  onCloseMenu = () => {},
  handleLogout,
}: UserNavProps) {
  const getActiveLinkClass = ({ isActive }: { isActive: boolean }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <nav className={className}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <NavLink
            to="/dictionary"
            className={getActiveLinkClass}
            aria-label="VocabBuilder Dictionary"
            onClick={() => onCloseMenu()}
          >
            Dictionary
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink
            to="/recommend"
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
