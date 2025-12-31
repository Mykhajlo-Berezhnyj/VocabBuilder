import clsx from "clsx";
import css from "./UserInfo.module.css";
import Icon from "../Icon/Icon";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

type UserInfoProps = {
  variant?: "header" | "menu";
  className?: string;
};

export default function UserInfo({
  variant = "header",
  className,
}: UserInfoProps) {
  const user = useSelector(selectUser);
  const userName = user.name || user.email;

  return (
    <div className={className}>
      <span className={clsx(css.userName, css[`userName-${variant}`])}>
        {userName}
      </span>
      <div className={clsx(css.avatar, css[`avatar-${variant}`])}>
        <Icon
          iconName="user"
          className={clsx(css.icon, css[`icon-${variant}`])}
        />
      </div>
    </div>
  );
}
