import css from "./AuthIllustration.module.css";
import desktop1x from "../image/register-destkop.webp";
import desktop2x from "../image/register-destkop@2x.webp";
import register1x from "../image/register.webp";
import register2x from "../image/register@2x.webp";

type AuthIllustration = {
  className?: string;
};

export default function AuthIllustration({ className }: AuthIllustration) {
  return (
    <div className={className}>
      <picture className={css.img}>
        <source
          media="(min-width:768px)"
          srcSet={`${desktop1x} 1x, ${desktop2x} 2x`}
        />
        <source
          media="(max-width: 767px)"
          srcSet={`${register1x} 1x, ${register2x} 2x`}
        />
        <img
          className={css.img}
          src={`${register1x}`}
          alt="Two people reading books"
        />
      </picture>
      <span className={css.authCaption}>
        Word · Translation · Grammar · Progress
      </span>
    </div>
  );
}
