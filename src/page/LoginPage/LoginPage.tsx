import clsx from "clsx";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthIllustration from "../../components/AuthIllustration/AuthIllustration";
import Container from "../../components/Container/Container";
import css from "../RegisterPage/RegisterPage.module.css";
import {
  InputUncontroled,
  ControlledInput,
  Counter,
} from "../../components/Dashboard/Input";
import { FormTest } from "../../components/Dashboard/Input copy";

export default function LoginPage() {
  return (
    <div className={css.sectionHome}>
      <Container className={css.containerRegister}>
        <div className={css.overlay}>
          <AuthForm className={clsx(css.authForm, css.loginForm)} />
        </div>
        <AuthIllustration className={css.illustration} />
        <InputUncontroled />
        <FormTest />
        <ControlledInput />
        <Counter />
      </Container>
    </div>
  );
}
