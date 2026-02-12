import css from "./Loader.module.css";
import clsx from "clsx";

type LoaderProps = {
  className?: string;
  loadName?: string;
};

export default function Loader({ className, loadName = "Loading" }: LoaderProps) {
  return (
    <div className={clsx(css.loaderWrapper, className)}>
      <div className={css.spinnerWrapper}>
        <div className={`${css.arc} ${css.arc1}`}></div>
        <div className={`${css.arc} ${css.arc2}`}></div>
        <div className={`${css.arc} ${css.arc3}`}></div>
        <div className={`${css.arc} ${css.arc4}`}></div>
        <div className={`${css.arc} ${css.arc5}`}></div>
        <div className={`${css.arc} ${css.arc6}`}></div>
        <div className={css.pulse}></div>
      </div>
      <p>{loadName}. Please wait...</p>
    </div>
  );
}
