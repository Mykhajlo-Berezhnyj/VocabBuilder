import css from "./AuthIllustration.module.css";

type AuthIllustration = {
  className?: string;
};

export default function AuthIllustration({ className }: AuthIllustration) {
  return (
    <div className={className}>
      <picture className={css.img}>
        <source
          media="(min-width:768px)"
          srcSet="/src/components/image/register-destkop.webp 1x, /src/components/image/register-desktop@2x.webp 2x"
        />
        <source
          media="(max-width: 767px)"
          srcSet="/src/components/image/register.webp 1x, /src/components/image/register@2x.webp 2x"
        />
        <img
          className={css.img}
          src="/src/components/image/register.webp"
          alt="Two people reading books"
        />
      </picture>
      <span className={css.authCaption}>
        Word · Translation · Grammar · Progress
      </span>
    </div>
  );
}

