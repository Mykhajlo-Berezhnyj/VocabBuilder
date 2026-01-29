import type {
  UseFormRegister,
  Path,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import css from "../InputFieldPassword/InputFieldPassword.module.css";
import clsx from "clsx";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  as?: "input" | "textarea";
  type?: "text" | "email" | "password";
  rules?: RegisterOptions<T>;
  error?: string | React.ReactNode;
  isValid?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}

export default function InputField<T extends FieldValues>({
  name,
  register,
  as = "input",
  error,
  isValid,
  rules,
  type = "text",
  placeholder,
  autoComplete,
  className,
  ...props
}: InputFieldProps<T>) {
  const Component = as;

  return (
    <div className={className}>
      <Component
        type={type}
        aria-label={placeholder ?? name}
        {...props}
        {...register(name as Path<T>, rules)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={clsx(
          css.input,
          error && css.inputError,
          !error && isValid && css.inputValid,
          as === "textarea" && css.area,
        )}
        aria-invalid={!!error}
      />
      {error && (
        <span role="alert" className={css.error}>
          {error}
        </span>
      )}
    </div>
  );
}
