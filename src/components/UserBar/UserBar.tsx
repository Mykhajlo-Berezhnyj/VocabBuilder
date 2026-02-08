import Button from "../Button/Button";
import ButtonLogout from "../Button/ButtonLogout/ButtonLogout";
import Icon from "../Icon/Icon";
import UserInfo from "../UserInfo/UserInfo";
import css from "./UserBar.module.css";

type UserBarProps = {
  isOpen?: boolean;
  togleMenu?: () => void;
  handleLogout: () => void;
  className?: string;
  variant?: "menu" | "header";
};

export default function UserBar({
  isOpen = false,
  togleMenu,
  handleLogout,
  className,
  variant = "header",
}: UserBarProps) {
  return (
    <div className={className}>
      <UserInfo className={css.userInfo} variant={variant} />
      <ButtonLogout className={css.btnLogout} onClick={handleLogout} />
      <Button className={isOpen ? css.btnX : css.btnNav} onClick={togleMenu}>
        <Icon
          iconName={isOpen ? "x" : "nav"}
          className={isOpen ? css.iconX : css.iconNav}
        />
      </Button>
    </div>
  );
}
