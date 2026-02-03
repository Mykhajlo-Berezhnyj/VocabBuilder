import Icon from "../../../Icon/Icon";
import css from "./LanguageTitle.module.css";

type LanguageTitleProps = {
  title: string;
  iconName: string;
};
export default function LanguageTitle({ title, iconName }: LanguageTitleProps) {
  return (
    <div className={css.titleWrap}>
      <span >{title}</span>
      <Icon iconName={iconName} className={css.icon} />
    </div>
  );
}
