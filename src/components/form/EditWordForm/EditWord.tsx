import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading } from "../../../redux/userDictionary/selectors";
import { editUserWord } from "../../../redux/userDictionary/operations";
import type { AppDispatch } from "../../../redux/store";
import toast from "react-hot-toast";
import type {
  UserWord,
  UserWordResponse,
} from "../../../redux/userDictionary/types";
import type { EditFormData } from "../type";
import type { CategoryNotVerb } from "../../../redux/filters/types";
import BaseWordForm from "../BaseWordForm";
import clsx from "clsx";
import css from "./EditForm.module.css";

type EditWordFormProps = {
  className?: string;
  onClose: () => void;
  editingWord: UserWordResponse;
};

function buildUserWord(
  editingWord: UserWordResponse,
  formData: EditFormData,
): UserWord {
  if (editingWord.category === "verb") {
    return {
      ua: formData.ua,
      en: formData.en,
      category: "verb",
      isIrregular: editingWord.isIrregular,
    };
  } else {
    return {
      ua: formData.ua,
      en: formData.en,
      category: editingWord.category as CategoryNotVerb,
    };
  }
}

export default function EditWordForm({
  className,
  editingWord,
  onClose,
}: EditWordFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const btnName = isLoading ? "Saving" : "Save";

  const onSubmit = async (formData: EditFormData) => {
    const updateWord = buildUserWord(editingWord, formData);
    try {
      await dispatch(
        editUserWord({ id: editingWord._id, userWord: updateWord }),
      ).unwrap();
      toast.success("Word editing successful");
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BaseWordForm<EditFormData>
      className={clsx(css.editForm, className)}
      onClose={onClose}
      onSubmit={onSubmit}
      btnName={btnName}
      isLoading={isLoading}
      defaultValues={{ en: editingWord.en, ua: editingWord.ua }}
    />
  );
}
