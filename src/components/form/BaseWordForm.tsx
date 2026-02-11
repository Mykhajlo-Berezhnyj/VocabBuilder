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

// export function EditWordForm<TAdd extends boolean>({
//   className,
//   editingWord,
//   children,
//   onClose,
// }: EditWordFormProps) {
//   const dispatch = useDispatch<AppDispatch>();
//   const isLoading = useSelector(selectIsLoading);

//   const methods = useForm<WordFormData<TAdd>>({
//     shouldFocusError: true,
//     shouldUnregister: false,
//     mode: "all",
//     reValidateMode: "onChange",
//     defaultValues: { ua: editingWord?.ua ?? "", en: editingWord?.en ?? "" },
//   });

//   const {
//     register,
//     formState: { errors, isValid, isSubmitted },
//     handleSubmit,
//   } = methods;

//   const onSubmit = async (formData: WordFormData<TAdd>) => {
//     if (editingWord) {
//       const updateWord = {
//         ua: formData.ua,
//         en: formData.en,
//         category: editingWord.category,
//         isIrregular: editingWord.isIrregular
//           ? editingWord.isIrregular
//           : undefined,
//       };

//       try {
//         await dispatch(
//           editUserWord({ id: editingWord._id, userWord: updateWord }),
//         ).unwrap();
//         toast.success("Word editing successful");
//         onClose();
//       } catch (error) {
//         console.error(error);
//         // toast.error(typeof error === "string" ? error : "Unknown error");
//       }
//     } else {
//       try {
//         await dispatch(createUserWord(formData as WordFormData<true>)).unwrap();
//         toast.success("New word added successfully");
//         onClose();
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   const onInvalid = () => {
//     toast.error("Please fill in all required fields");
//   };
//   const fields: Array<"ua" | "en"> = ["ua", "en"];

//   return (
//     <FormProvider {...methods}>
//       <form
//         className={clsx(css.form, className)}
//         onSubmit={handleSubmit(onSubmit, onInvalid)}
//       >
//         {children}
//         <div className={css.inputGroup}>
//           {fields.map((el) => (
//             <div key={el} className={css.fieldWrap}>
//               <LanguageLabel className={css.wordWrap} fieldName={el} />
//               <InputField
//                 className={css.inputWrap}
//                 name={el}
//                 register={register}
//                 rules={
//                   el === "en"
//                     ? {
//                         required: "Required",
//                         pattern: {
//                           value: /^\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*$\b/,
//                           message: "Invald word",
//                         },
//                       }
//                     : {
//                         required: "Required",
//                         pattern: {
//                           value: /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
//                           message: "Invalid ukrainian word",
//                         },
//                       }
//                 }
//                 error={errors[el]?.message}
//               />
//             </div>
//           ))}
//         </div>
//         <div className={css.btnWrap}>
//           <Button
//             type="submit"
//             className={css.btnSave}
//             disabled={isLoading || (!isValid && isSubmitted)}
//           >
//             {isLoading ? "Saving" : "Save"}
//           </Button>
//           <Button
//             color="fill"
//             className={css.btnCancel}
//             onClick={() => {
//               onClose();
//             }}
//           >
//             Cancel
//           </Button>
//         </div>
//       </form>
//     </FormProvider>
//   );
// }
