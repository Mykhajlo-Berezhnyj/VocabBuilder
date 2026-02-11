import AddWordHeader from "./AddWordHeader/AddWordHeader";
import css from "./AddWordForm.module.css";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { selectIsLoading } from "../../../redux/userDictionary/selectors";
import type { AddFormData } from "../type";
import { createUserWord } from "../../../redux/userDictionary/operations";
import toast from "react-hot-toast";
import BaseWordForm from "../BaseWordForm";

type AddWordFormProps = {
  className?: string;
  onClose: () => void;
};

export default function AddWordForm({ className, onClose }: AddWordFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const btnName = isLoading ? "Adding word" : "Add word";

  const onSubmit = async (formData: AddFormData) => {
    try {
      await dispatch(createUserWord(formData)).unwrap();
      toast.success("New word added successfully");
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BaseWordForm<AddFormData>
      className={clsx(css.form, className)}
      btnName={btnName}
      onSubmit={onSubmit}
      isLoading={isLoading}
      children={<AddWordHeader className={css.formHeader} />}
      onClose={onClose}
      defaultValues={{ en: "", ua: "" }}
    />
  );
}
