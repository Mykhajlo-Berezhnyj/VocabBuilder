import type { UseFormRegister, Path, FieldValues } from "react-hook-form";
import css from "../InputFieldPassword/InputFieldPassword.module.css";
import clsx from "clsx";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: "text" | "email" | "password";
  error?: string | React.ReactNode;
  isValid?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}

export default function InputField<T extends FieldValues>({
  name,
  register,
  error,
  isValid,
  type = "text",
  placeholder,
  autoComplete,
  className,
  ...props
}: InputFieldProps<T>) {
  return (
    <div className={className}>
      <input
        type={type}
        aria-label={placeholder ?? name}
        {...props}
        {...register(name)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={clsx(
          css.input,
          error && css.inputError,
          !error && isValid && css.inputValid
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
