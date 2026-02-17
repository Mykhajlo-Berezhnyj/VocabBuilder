import { useNavigate } from "react-router-dom";
import css from "./AuthForm.module.css";
import clsx from "clsx";
import InputField from "../InputField/InputField";
import InputFieldPassword from "../InputFieldPassword/InputFieldPassword";
import { useForm, type FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registration, login } from "../../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import {
  loginSchema,
  registrationSchema,
  type LoginData,
  type RegistrationData,
} from "../validation/validation";
import { type AppDispatch } from "../../redux/store";
import toast from "react-hot-toast";
import {
  selectExistingEmail,
  selectIsLoading,
} from "../../redux/auth/selectors";
import { addExistingEmail, clearExistingEmail } from "../../redux/auth/slice";
import ActionBlock from "../ActionBlock/ActionBlock";

interface AuthFormProps {
  className?: string;
  isRegisterPage?: boolean;
}

export default function AuthForm({ className, isRegisterPage }: AuthFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const schema = isRegisterPage ? registrationSchema : loginSchema;
  const existingEmail = useSelector(selectExistingEmail);
  const isLoading = useSelector(selectIsLoading);

  type FormData = RegistrationData | LoginData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isValid, dirtyFields },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { email: existingEmail ? existingEmail : "" },
    shouldFocusError: true,
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (isRegisterPage) {
        const regData = {
          ...(data as RegistrationData),
          name: (data as RegistrationData).name.trim(),
          email: data.email.trim().toLowerCase(),
          password: data.password.trim(),
        };
        await dispatch(registration(regData)).unwrap();
        toast.success("Registration successful!");
        dispatch(clearExistingEmail());
      } else {
        const loginData = {
          ...(data as LoginData),
          email: data.email.trim().toLowerCase(),
          password: data.password.trim(),
        };
        await dispatch(login(loginData)).unwrap();
        toast.success("Login successful!");
        dispatch(clearExistingEmail());
        navigate("/dictionary");
      }
      reset();
    } catch (error) {
      if (
        typeof error === "object" &&
        error &&
        "status" in error &&
        error.status === 409
      ) {
        dispatch(addExistingEmail(data.email));
        navigate("/login");
        toast("This email already exists. Please enter password to log in.", {
          icon: "ℹ️",
        });
      }
    }
  };

  return (
    <form
      className={clsx(css.authForm, className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={clsx(css.titleBlock, !isRegisterPage && css.titleBlockLogin)}
      >
        <h1 className={css.titleForm}>
          {isRegisterPage ? "Register" : "Login"}
        </h1>
        <p className={css.titleText}>
          {isRegisterPage
            ? "To start using our services, please fill out the registration form below. All fields are mandatory:"
            : "Please enter your login details to continue using our service:"}
        </p>
      </div>
      <div className={css.inputBlock}>
        {isRegisterPage && (
          <InputField
            name="name"
            placeholder="Name"
            register={register}
            error={(errors as FieldErrors<RegistrationData>).name?.message}
            isValid={
              (dirtyFields as Partial<Record<keyof RegistrationData, boolean>>)
                .name && !(errors as FieldErrors<RegistrationData>).name
            }
            className={css.inputWrap}
          />
        )}

        <InputField
          name="email"
          placeholder="Email"
          register={register}
          error={errors.email?.message as string | undefined}
          isValid={dirtyFields.email && !errors.email}
          className={css.inputWrap}
        />

        <InputFieldPassword
          name="password"
          placeholder="Password"
          register={register}
          error={errors.password?.message as string | undefined}
          isValid={dirtyFields.password && !errors.password}
          className={css.inputWrap}
        />
      </div>
      <ActionBlock
        className={css.btnWrap}
        btnName={
          isRegisterPage
            ? isLoading
              ? "Registering..."
              : "Register"
            : isLoading
              ? "Login In ..."
              : "Login"
        }
        type="submit"
        classNameBtn={css.btnLogin}
        disabled={isSubmitting || !isValid}
        linkHref={isRegisterPage ? "/login" : "/register"}
        linkText={isRegisterPage ? "Login" : "Register"}
      />
    </form>
  );
}
