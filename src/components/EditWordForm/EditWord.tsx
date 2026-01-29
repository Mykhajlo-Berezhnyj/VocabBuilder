import Icon from "../Icon/Icon";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../Button/Button";
import css from "./EditWord.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/userDictionary/selectors";
import {
  createUserWord,
  editUserWord,
} from "../../redux/userDictionary/operations";
import type { AppDispatch } from "../../redux/store";
import type { Category } from "../../redux/filters/types";
import toast from "react-hot-toast";
import InputField from "../InputField/InputField";
import LanguageLabel from "../LanguageLabel/LanguageLabel";
import clsx from "clsx";
import type { UserWordResponse } from "../../redux/userDictionary/types";

type EditWordFormProps = {
  className?: string;
  onClose: () => void;
  children?: React.ReactNode;
  editingWord?: UserWordResponse | null;
};

type WordFormData<TAdd extends boolean> = {
  en: string;
  ua: string;
} & (TAdd extends true
  ? {
      category: Category;
      isIrregular?: boolean;
    }
  : Record<string, never>);

export default function EditWordForm<TAdd extends boolean>({
  className,
  editingWord,
  children,
  onClose,
}: EditWordFormProps) {
  console.log("🚀 ~ EditWordForm ~ editingWord:", editingWord)
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);

  const methods = useForm<WordFormData<TAdd>>({
    shouldFocusError: true,
    shouldUnregister: false,
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: { ua: editingWord?.ua ?? "", en: editingWord?.en ?? "" },
  });

  const {
    register,
    formState: { errors, isValid, isSubmitted },
    handleSubmit,
  } = methods;

  const onSubmit = async (formData: WordFormData<TAdd>) => {
    console.log("🚀 ~ onSubmit ~ editingWord:", editingWord);
    if (editingWord) {
      const updateWord = {
        ua: formData.ua,
        en: formData.en,
        category: editingWord.category,
        isIrregular: editingWord.isIrregular
          ? editingWord.isIrregular
          : undefined,
      };

      try {
        await dispatch(
          editUserWord({ id: editingWord._id, userWord: updateWord }),
        ).unwrap();
        toast.success("Word editing successful");
        onClose();
      } catch (error) {
        toast.error(typeof error === "string" ? error : "Unknown error");
      }
    } else {
      try {
        await dispatch(createUserWord(formData as WordFormData<true>)).unwrap();
        toast.success("New word added successfully");
        onClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onInvalid = () => {
    toast.error("Please fill in all required fields");
  };
  const fields: Array<"ua" | "en"> = ["ua", "en"];

  return (
    <FormProvider {...methods}>
      <form
        className={clsx(css.form, className)}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        {children}
        <div className={css.inputGroup}>
          {fields.map((el) => (
            <div key={el} className={css.fieldWrap}>
              <LanguageLabel className={css.wordWrap} fieldName={el} />
              <InputField
                className={css.inputWrap}
                name={el}
                register={register}
                rules={
                  el === "en"
                    ? {
                        required: "Required",
                        pattern: {
                          value: /^\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*$\b/,
                          message: "Invald word",
                        },
                      }
                    : {
                        required: "Required",
                        pattern: {
                          value: /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
                          message: "Invalid ukrainian word",
                        },
                      }
                }
                error={errors[el]?.message}
              />
            </div>
          ))}
        </div>
        <div className={css.btnWrap}>
          <Button
            type="submit"
            className={css.btnSave}
            disabled={isLoading || (!isValid && isSubmitted)}
          >
            {isLoading ? "Saving" : "Save"}
          </Button>
          <Button
            color="fill"
            className={css.btnCancel}
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
