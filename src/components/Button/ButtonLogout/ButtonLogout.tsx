import Icon from "../../Icon/Icon";
import Button from "../Button";
import css from "./ButtonLogout.module.css";
import clsx from "clsx";

type ButtonLogoutProps = {
  className?: string;
  onClick: () => void;
};

export default function ButtonLogout({
  className,
  onClick,
}: ButtonLogoutProps) {
  return (
    <Button className={clsx(css.btnLogout, className)} onClick={onClick}>
      Log out <Icon iconName="arrow-right" className={css.icon} />
    </Button>
  );
}
