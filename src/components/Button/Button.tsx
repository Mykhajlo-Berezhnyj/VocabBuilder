import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import css from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  color?: "transparent" | "fill";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  type = "button",
  className,
  color = "transparent",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(css.button, css[color] ?? css.transparent, className)}
      {...props}
    >
      {children}
    </button>
  );
}
