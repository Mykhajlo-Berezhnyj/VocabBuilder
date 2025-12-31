import clsx from "clsx";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthIllustration from "../../components/AuthIllustration/AuthIllustration";
import Container from "../../components/Container/Container";
import css from "../RegisterPage/RegisterPage.module.css";

export default function LoginPage() {
  return (
    <div className={css.sectionHome}>
      <Container className={css.containerRegister}>
        <div className={css.overlay}>
          <AuthForm className={clsx(css.authForm, css.loginForm)} />
        </div>
        <AuthIllustration className={css.illustration} />
      </Container>
    </div>
  );
}
