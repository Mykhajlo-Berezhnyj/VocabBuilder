import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import css from "./Logo.module.css";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Link to="/" aria-label="Home VocabBuilder" className={className}>
      <Icon
        className={css.icon}
        iconName="logo"
        aria-label="logo VocabBuilder"
      />
      VocabBuilder
    </Link>
  );
}
