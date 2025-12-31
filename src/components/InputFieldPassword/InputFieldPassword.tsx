import { useState } from "react";
import BtnEye from "../Button/BtnEye/BtnEye";
import css from "./InputFieldPassword.module.css";
import type { Path, UseFormRegister, FieldValues } from "react-hook-form";
import clsx from "clsx";

interface InputFieldPasswordProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string | React.ReactNode;
  isValid?: boolean;
  placeholder: string;
  className?: string;
}

export default function InputFieldPassword<T extends FieldValues>({
  name,
  register,
  error,
  isValid,
  placeholder,
  className,
  ...props
}: InputFieldPasswordProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const togle = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={className}>
      <input
        className={clsx(
          css.input,
          error && css.inputError,
          !error && isValid && css.inputValid
        )}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        aria-label="input password"
        aria-invalid={!!error}
        {...props}
        {...register(name)}
      />
      <BtnEye
        showPassword={showPassword}
        onTogle={togle}
        className={css.btnEye}
      />
      {error && (
        <span role="alert" className={css.error}>
          {error}
        </span>
      )}
    </div>
  );
}
