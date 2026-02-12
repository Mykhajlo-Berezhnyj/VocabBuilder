import { Link } from "react-router-dom";
import Button from "../Button/Button";
import css from "./ActionBlock.module.css";
import clsx from "clsx";

type ActionBlockBaseProps = {
  className?: string;
  classNameBtn?: string;
  btnName: string;
  type?: "button" | "submit" | "reset";
  btnOnClick?: () => void;
  disabled?: boolean;
  classNameLink?: string;
  linkHref?: string;
  linkText: string;
  linkOnClick?: () => void;
};

type ActionBlockLinkProps = ActionBlockBaseProps & {
  linkOnClick?: () => void;
  state?: { openAddModal: boolean };
};

type ActionBlockButtonProps = ActionBlockBaseProps & {
  linkOnClick: () => void;
  state?: undefined;
};

type ActionBlockProps = ActionBlockLinkProps | ActionBlockButtonProps;

export default function ActionBlock({
  className,
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
    <div className={clsx(css.btnWrap, className)}>
      <Button
        aria-label={btnName}
        type={type}
        color="fill"
        className={clsx(css.btnAction, classNameBtn)}
        onClick={btnOnClick}
        disabled={disabled}
      >
        {btnName}
      </Button>
      {linkHref ? (
        <Link
          to={linkHref}
          aria-label={linkText}
          className={clsx(css.link, classNameLink)}
          onClick={linkOnClick}
          state={state}
        >
          {linkText}
        </Link>
      ) : (
        <Button
          aria-label={linkText}
          className={clsx(css.link, classNameLink)}
          onClick={linkOnClick}
        >
          {linkText}
        </Button>
      )}
    </div>
  );
}
