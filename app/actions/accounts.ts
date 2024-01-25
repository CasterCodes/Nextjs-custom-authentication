"use server";

import { cookies } from "next/headers";

import axios from "axios";
import { permanentRedirect, redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { z } from "zod";

const AccountSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: "First name is a required field",
    })
    .min(3, {
      message:
        "First name is required Field. Should be more than three characters",
    })
    .trim(),

  lastName: z
    .string({
      required_error: "Last name is a required field",
      invalid_type_error: "Last name is required field ",
    })
    .min(3, {
      message:
        "Last name is required Field. Should be more than three characters",
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

export type AccountInitialState = {
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

  try {
    const response = await axios.post(
      `${process.env.ROOT_URL}/api/accounts`,
      validatedFields.data
    );

    if (response.data.status === "fail") {
      return {
        message: response.data.message,
      };
    }
  } catch (error: any) {
    return {
      message: error.message,
    };
  }

  redirect("/accounts/login");
}

export async function loginUser(
  formState: AccountInitialState,
  formData: FormData
) {
  const validatedFields = LoginUser.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Some required field are empty",
    };
  }

  try {
    const response = await axios.post(
      `${process.env.ROOT_URL}/api/accounts/login`,
      validatedFields.data
    );

    if (response.data.status === "fail") {
      return {
        message: response.data.message,
      };
    }
    cookies().set({
      name: "access_token_auth",
      value: response.data.accessToken,
      httpOnly: true,
    });
  } catch (error) {
    return {
      message: "Error login",
    };
  }

  redirect("/accounts/profile");
}
