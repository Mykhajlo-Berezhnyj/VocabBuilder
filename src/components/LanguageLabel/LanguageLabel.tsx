import Icon from "../Icon/Icon";
import css from "./LanguageLabel.module.css";

type LanguageLabelProps = {
  className?: string;
  fieldName: string;
};

export default function LanguageLabel({
  className,
  fieldName,
}: LanguageLabelProps) {
  return (
    <span className={className}>
      <Icon
        iconName={fieldName === "en" ? "icon-uk" : "icon-ua"}
        className={css.iconFlag}
        aria-hidden="true"
      />
      {fieldName === "en" ? "English" : "Ukrainian"}
    </span>
  );
}
