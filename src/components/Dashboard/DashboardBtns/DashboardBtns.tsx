import { NavLink } from "react-router-dom";
import Button from "../../Button/Button";
import Icon from "../../Icon/Icon";
import css from "./DashboardBtns.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectIsOpen } from "../../../redux/modal/selector";
import type { AppDispatch } from "../../../redux/store";
import {  openModal } from "../../../redux/modal/slice";

type DashboardBtnsProps = {
  className: string;
};

export default function DashboardBtns({ className }: DashboardBtnsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector(selectIsOpen);

  const handleClick = () => {
    if (isOpen) return;
    dispatch(openModal({ type: "addWord" as const }));
  };

  return (
    <div className={className}>
      <Button className={css.btnPlus} onClick={handleClick}>
        Add word <Icon className={css.iconPlus} iconName="plus" />
      </Button>
      <NavLink to="/training" className={css.link}>
        Train oneself <Icon className={css.iconPlus} iconName="link-right" />
      </NavLink>
    </div>
  );
}
