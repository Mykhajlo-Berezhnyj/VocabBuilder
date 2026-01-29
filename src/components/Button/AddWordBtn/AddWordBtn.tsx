import { useDispatch } from "react-redux";
import Icon from "../../Icon/Icon";
import Button from "../Button";
import type { AppDispatch } from "../../../redux/store";
import { addUserWord } from "../../../redux/userDictionary/operations";
import css from "./AddWordBtn.module.css";

type AddWordBtnProps = {
  id: string;
};

export default function AddWordBtn({ id }: AddWordBtnProps) {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    dispatch(addUserWord(id));
  };

  return (
    <Button onClick={handleClick} className={css.btnAddWord}>
      <Icon iconName="btn-addWord" size={20} />
    </Button>
  );
}
