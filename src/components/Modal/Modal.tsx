import { useEffect } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";

type ModalProp = {
  isOpen: boolean;
  onClose: () => void;
  // type: "addWord" | "editWord" | null;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProp) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={css.modalBackdrop} onClick={handleBackdrop}>
      <div className={css.containerModal}>
        <Button onClick={onClose} className={css.btnClose}>
          <Icon iconName="icon-close" className={css.iconClose} />
        </Button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
