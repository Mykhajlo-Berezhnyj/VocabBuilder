import * as yup from "yup";

const baseSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "must be a valid email")
    .required("Email is required"),
});

export function passwordTestMessage(value: unknown, ctx: yup.TestContext) {
  const v = String(value ?? "");

  if (v.length < 7) {
    return ctx.createError({
      message: "Password must be at least 7 characters long",
    });
  }

  if (!/^[A-Za-z\d]+$/.test(v)) {
    return ctx.createError({
      message: "Password can contain only Latin letters and digits",
    });
  }

  if (!/\d/.test(v)) {
    return ctx.createError({
      message: "Password must contain at least one digit",
    });
  }

  if (!/[A-Za-z]{6}/.test(v)) {
    return ctx.createError({
      message: "Password must contain a sequence of 6 letters",
    });
  }

  const originalPattern = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/;
  if (!originalPattern.test(v)) {
    return ctx.createError({
      message: "Password does not match the required pattern",
    });
  }

  return true;
}

export const registrationSchema = baseSchema.shape({
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      "Password must be exactly 7 characters long and contain at least 6 letters and 1 number"
    ),
});

export const loginSchema = baseSchema.shape({
  password: yup.string().required("Password is required"),
});

export type LoginData = yup.InferType<typeof loginSchema>;
export type RegistrationData = yup.InferType<typeof registrationSchema>;
