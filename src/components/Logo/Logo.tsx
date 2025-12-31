import Icon from "../Icon/Icon";
import css from "./Logo.module.css";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <a href="/" aria-label="Home VocabBuilder" className={className}>
      <Icon
        className={css.icon}
        iconName="logo"
        aria-label="logo VocabBuilder"
      />
      VocabBuilder
    </a>
  );
}
