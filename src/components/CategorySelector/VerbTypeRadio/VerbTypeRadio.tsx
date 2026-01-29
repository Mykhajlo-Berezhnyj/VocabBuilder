import css from "./VerbTypeRadio.module.css";
import Icon from "../../Icon/Icon";
import type { Category } from "../../../redux/filters/types";
import clsx from "clsx";

export type Option = { label: Category; value: Category };

type VerbTypeRadioProps = {
  className: string;
  mode: "form" | "filter";
  hasError?: boolean;
  isIrregular?: boolean | null;
  onChange?: (value: boolean) => void;
};

export default function VerbTypeRadio({
  className,
  mode,
  hasError,
  isIrregular,
  onChange,
}: VerbTypeRadioProps) {
  const regularId = `verb-regular-${mode}`;
  const irregularId = `verb-irregular-${mode}`;
  const name = `verb-${mode}`;
  console.log("🚀 ~ VerbTypeRadio ~ hasError:", hasError)

  return (
    <div className={clsx(css.radioGroup, className, hasError && css.error)}>
      <div className={css.radioWrap}>
        <input
          className={css.radio}
          type="radio"
          name={name}
          id={regularId}
          value="false"
          checked={isIrregular === false}
          onChange={() => onChange?.(false)}
        />
        <label htmlFor={regularId} className={css.radioWrap}>
          <Icon
            className={clsx(css.iconRadio, mode && css[mode])}
            iconName={isIrregular === false ? "checked" : "unchecked"}
          />
          Regular
        </label>
      </div>
      <div className={css.radioWrap}>
        <input
          className={css.radio}
          type="radio"
          name={name}
          id={irregularId}
          value="true"
          checked={isIrregular === true}
          onChange={() => onChange?.(true)}
        />

        <label className={css.radioWrap} htmlFor={irregularId}>
          <Icon
            className={clsx(css.iconRadio, mode && css[mode])}
            iconName={isIrregular === true ? "checked" : "unchecked"}
          />
          Irregular
        </label>
      </div>
    </div>
  );
}
