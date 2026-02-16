import Icon from "../../Icon/Icon";
import Button from "../Button";
import css from "./AddWordBtn.module.css";

type AddWordBtnProps = {
  onClick: () => void;
};

export default function AddWordBtn({ onClick }: AddWordBtnProps) {
  return (
    <Button
      aria-label="Add to dictionary"
      title="Add to dictionary"
      onClick={onClick}
      className={css.btnAddWord}
    >
      <span className={css.btnName}>Add to dictionary</span>
      <Icon iconName="btn-addWord" className={css.icon} size={20} />
    </Button>
  );
}
