"use server";

import { z } from "zod";

const AccountSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: "First name is a required field",
    })
    .trim(),

  lastName: z
    .string({
      invalid_type_error: "Last name is required field ",
    })
    .trim(),

  email: z.string().email({ message: "Provide a valid email" }),
  password: z
    .string({
      invalid_type_error: "Password is a required field",
    })
    .min(6, { message: "Password should not be less 6 characters" }),
  confirmPassword: z.string({
    invalid_type_error: "Confirm password in a required field",
  }),
});

const CreateUserAccount = AccountSchema.refine(
  (schema) => schema.confirmPassword === schema.password,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

const LoginUser = AccountSchema.omit({
  firstName: true,
  lastName: true,
  confirmPassword: true,
});

type AccountInitialState = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };

  message?: string | null;
};

export async function createUserAccount(
  prevState: AccountInitialState,
  formData: FormData
) {
  const validatedFields = CreateUserAccount.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing some fields. Failed to create user",
    };
  }

  const { email, firstName, lastName, password, confirmPassword } =
    validatedFields.data;

  console.log({ email, firstName, lastName, password, confirmPassword });
}

export async function loginUser(
  formState: AccountInitialState,
  formData: FormData
) {}
