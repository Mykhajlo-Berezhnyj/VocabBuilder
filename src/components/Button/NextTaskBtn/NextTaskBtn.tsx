import Button from "../Button";
import Icon from "../../Icon/Icon";
import css from "./NextTaskBtn.module.css";

type NextTaskBtnProps = {
  className: string;
  handleClick: () => void;
};

export default function NextTaskBtn({
  className,
  handleClick,
}: NextTaskBtnProps) {
  return (
    <Button className={className} onClick={() => handleClick()}>
      Next <Icon iconName="link-right" className={css.icon}></Icon>
    </Button>
  );
}
