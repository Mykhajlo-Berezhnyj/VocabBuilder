import Icon from "../../Icon/Icon";
import Button from "../Button";
import css from "./BtnEye.module.css";

type BtnEyeProps = {
  showPassword: boolean;
  onTogle: () => void;
  className?: string;
};

export default function BtnEye({
  showPassword,
  onTogle,
  className,
  ...props
}: BtnEyeProps) {
  return (
    <Button
      className={className}
      aria-label={showPassword ? "hide password" : "show password"}
      title={showPassword ? "hide password" : "show password"}
      onClick={onTogle}
      {...props}
    >
      <Icon iconName={showPassword ? "eye" : "eye-off"} className={css.icon} />
    </Button>
  );
}
