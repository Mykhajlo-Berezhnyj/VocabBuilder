import { Link } from "react-router-dom";
import Button from "../Button/Button";
import css from "./ActionBlock.module.css";
import clsx from "clsx";

type ActionBlockProps = {
  classNameBtn?: string;
  btnName: string;
  type?: "button" | "submit" | "reset";
  btnOnClick?: () => void;
  disabled?: boolean;
  classNameLink?: string;
  linkHref: string;
  linkText: string;
  linkOnClick?: () => void;
  state?: { openAddModal: boolean };
};

export default function ActionBlock({
  classNameBtn,
  btnName,
  type = "button",
  disabled = false,
  btnOnClick,
  classNameLink,
  linkHref,
  linkOnClick,
  linkText,
  state,
}: ActionBlockProps) {
  return (
    <div className={css.btnWrap}>
      <Button
        type={type}
        color="fill"
        className={clsx(css.btnAction, classNameBtn)}
        onClick={btnOnClick}
        disabled={disabled}
      >
        {btnName}
      </Button>
      <Link
        to={linkHref}
        className={clsx(css.link, classNameLink)}
        onClick={linkOnClick}
        state={state}
      >
        {linkText}
      </Link>
    </div>
  );
}
