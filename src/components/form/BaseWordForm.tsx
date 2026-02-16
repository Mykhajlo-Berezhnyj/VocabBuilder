import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type Path,
} from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../InputField/InputField";
import LanguageLabel from "../LanguageLabel/LanguageLabel";
import clsx from "clsx";
import ActionBlock from "../ActionBlock/ActionBlock";
import css from "./BaseWordForm.module.css";

type BaseWordFormProps<TFormData extends FieldValues> = {
  className?: string;
  btnName: string;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (formData: TFormData) => void | Promise<void>;
  children?: React.ReactNode;
  defaultValues: DefaultValues<TFormData>;
};

export default function BaseWordForm<TFormData extends FieldValues>({
  className,
  btnName,
  isLoading,
  onClose,
  onSubmit,
  children,
  defaultValues,
}: BaseWordFormProps<TFormData>) {
  const methods = useForm<TFormData>({
    shouldFocusError: true,
    shouldUnregister: false,
    mode: "all",
    reValidateMode: "onChange",
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = methods;

  const fields = ["ua", "en"] as Array<Path<TFormData>>;

  const onInvalid = () => {
    toast.error("Please fill in all required fields");
  };

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
                        setValueAs: (value: string) =>
                          value.trim().toLowerCase(),
                        pattern: {
                          value: /^\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*$\b/,
                          message: "Invald word",
                        },
                      }
                    : {
                        required: "Required",
                        setValueAs: (value: string) =>
                          value.trim().toLowerCase(),
                        pattern: {
                          value: /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
                          message: "Invalid ukrainian word",
                        },
                      }
                }
                error={errors[el]?.message as string | undefined}
              />
            </div>
          ))}
        </div>
        <ActionBlock
          className={css.btnWrap}
          btnName={btnName}
          type="submit"
          disabled={isLoading || (!isValid && isSubmitted)}
          classNameBtn={css.btnSubmit}
          classNameLink={css.btnCancel}
          linkText="Cancel"
          linkOnClick={onClose}
        />
      </form>
    </FormProvider>
  );
}
