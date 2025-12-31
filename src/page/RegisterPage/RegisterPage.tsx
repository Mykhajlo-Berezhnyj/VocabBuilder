import { useLocation } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthIllustration from "../../components/AuthIllustration/AuthIllustration";
import Container from "../../components/Container/Container";
import css from "./RegisterPage.module.css";

export default function RegisterPage() {
  const location = useLocation();
  const pathname = location.pathname;
  const isRegisterPage = pathname.includes("/register");

  return (
    <div className={css.sectionHome}>
      <Container className={css.containerRegister}>
        <div className={css.overlay}>
          <AuthForm className={css.authForm} isRegisterPage={isRegisterPage} />
        </div>
        <AuthIllustration className={css.illustration} />
      </Container>
    </div>
  );
}
