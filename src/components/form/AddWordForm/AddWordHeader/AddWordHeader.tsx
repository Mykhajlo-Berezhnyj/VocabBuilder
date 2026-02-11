import { useSelector } from "react-redux";
import { selectOptions } from "../../../../redux/filters/selectors";
import css from "./AddWordHeader.module.css";
import SelectCategory, {
  type Option,
} from "../../../CategorySelector/SelectCategory/SelectCategory";
import { Controller, useFormContext, type FieldError } from "react-hook-form";
import VerbTypeRadio from "../../../CategorySelector/VerbTypeRadio/VerbTypeRadio";
import { useEffect } from "react";
import clsx from "clsx";

type AddWordHeaderProps = {
  className: string;
};

export default function AddWordHeader({ className }: AddWordHeaderProps) {
  const options = useSelector(selectOptions);

  const {
    control,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext();

  const category = watch("category");

  useEffect(() => {
    if (category === "verb") {
      trigger("isIrregular");
    } else {
      setValue("isIrregular", null, {
        shouldValidate: false,
        shouldTouch: false,
        shouldDirty: false,
      });
    }
  }, [category, trigger, setValue]);

  return (
    <div className={clsx(css.headerForm, className)} >
      <header className={css.headerWrap}>
        <h2 className={css.titleHeader}>Add word</h2>
        <p className={css.textHeader}>
          Adding a new word to the dictionary is an important step in enriching
          the language base and expanding the vocabulary.
        </p>
      </header>
      <div className={css.filterCategory}>
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field, fieldState }) => {
            const error: FieldError | undefined = fieldState.error;
            return (
              <div className={css.selectWrap}>
                <SelectCategory
                  className={css.select}
                  mode="form"
                  options={options}
                  value={
                    options.find((opt) => opt.value === field.value) || null
                  }
                  onChange={(option: Option | null) => {
                    setValue("category", option?.value ?? null, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                />
                {error?.message && (
                  <span className={css.error}>{error.message}</span>
                )}
              </div>
            );
          }}
        />
        {category === "verb" && (
          <Controller
            name="isIrregular"
            control={control}
            rules={{
              validate: (value) =>
                (value !== null && value !== undefined) ||
                "Type isIrregular is required",
            }}
            render={({ field, fieldState }) => {
              const error: FieldError | undefined = fieldState.error;
              return (
                <div className={css.radioWrap}>
                  <VerbTypeRadio
                    className={css.radioGroup}
                    mode="form"
                    isIrregular={field.value ?? null}
                    onChange={(value) => {
                      setValue("isIrregular", value, {
                        shouldValidate: true,
                        shouldTouch: true,
                        shouldDirty: true,
                      });
                    }}
                    hasError={!!errors.isIrregular}
                  />
                  {error?.message && (
                    <span className={css.error}>{error.message}</span>
                  )}
                </div>
              );
            }}
          />
        )}
      </div>
    </div>
  );
}
