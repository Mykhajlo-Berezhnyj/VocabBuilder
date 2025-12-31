import Icon from "../../Icon/Icon";
import Button from "../Button";
import css from "./ButtonLogout.module.css";

type ButtonLogoutProps = {
  className?: string;
};

export default function ButtonLogout({ className }: ButtonLogoutProps) {
  return (
    <Button className={className}>
      Log out <Icon iconName="arrow-right" className={css.icon} />
    </Button>
  );
}
