// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import css from "./ActionsBtn.module.css";
import React from "react";
import Button from "../Button";
import type { UserWordResponse } from "../../../redux/userDictionary/types";
import Icon from "../../Icon/Icon";

type ActionsBtnProps = {
  editingWord: UserWordResponse;
  onEdit: (editingWord: UserWordResponse) => void;
  onDelete: (id: string) => void;
};

export default function ActionsBtn({ editingWord, onEdit, onDelete }: ActionsBtnProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        className={css.btnAction}
      >
        ...
      </Button>

      <Menu
        id="actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            borderRadius: "15px",
            px: "24px",
            py: "12px",
            boxShadow:
              " 0px 4px 47px 0px rgba(var(--color-font-primary), 0.08)",
            backgroundColor: "var(--background-header)",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            onEdit(editingWord);
            handleClose();
          }}
        >
          <span className={css.labelWrap}>
            <Icon iconName="edit" className={css.iconMenu} /> Edit
          </span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete(editingWord._id);
            handleClose();
          }}
        >
          <span className={css.labelWrap}>
            <Icon iconName="trash" className={css.iconMenu} /> Delete
          </span>
        </MenuItem>
      </Menu>
    </>
  );
}
