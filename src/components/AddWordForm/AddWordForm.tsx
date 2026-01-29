import EditWordForm from "../EditWordForm/EditWord";
import AddWordHeader from "./AddWordHeader/AddWordHeader";
import css from "../EditWordForm/EditWord.module.css";
import clsx from "clsx";

type AddWordFormProps = {
  className?: string;
  onClose: () => void;
};

export default function AddWordForm({ className, onClose }: AddWordFormProps) {
  return (
    <EditWordForm
      className={clsx(css.form ,className)}
      children={<AddWordHeader className={css.formHeader} />}
      onClose={onClose}
    />
  );
}
