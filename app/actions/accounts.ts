"use server";
import axios from "axios";
import { redirect } from "next/navigation";
import { z } from "zod";
import { deleteCookie, getCookie, setCookie } from "../lib/cookie";

export type AccountInitialState = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    token?: string[];
    confirmPassword?: string[];
  };

  message?: string | null;
};

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

  token: z.string(),
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

const CreateUserAccount = AccountSchema.omit({ token: true }).refine(
  (schema) => schema.confirmPassword === schema.password,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

const LoginUser = AccountSchema.omit({
  firstName: true,
  lastName: true,
  token: true,
  confirmPassword: true,
});

const ResetPasswod = AccountSchema.omit({
  firstName: true,
  lastName: true,
  email: true,
}).refine((schema) => schema.confirmPassword === schema.password, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ChangePassword = AccountSchema.omit({
  firstName: true,
  lastName: true,
  email: true,
  token: true,
});

const ForgotPassword = AccountSchema.omit({
  firstName: true,
  lastName: true,
  password: true,
  token: true,
  confirmPassword: true,
});

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

    setCookie("access_token_auth", response.data.accessToken);
  } catch (error) {
    return {
      message: "Error login",
    };
  }

  redirect("/accounts/profile");
}

export async function logout() {
  try {
    const response = await axios.post(
      `${process.env.ROOT_URL}/api/accounts/logout`
    );

    if (response.data.status === "fail") {
      return {
        message: response.data.message,
      };
    }

    deleteCookie("access_token_auth");
  } catch (error) {
    return {
      message: "Logout failed",
    };
  }

  redirect("/accounts/login");
}

export async function resetPassword(
  formState: AccountInitialState,
  formData: FormData
) {
  const validatedFields = ResetPasswod.safeParse({
    password: formData.get("password"),
    token: formData.get("token"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Some required field are empty",
    };
  }

  try {
    const response = await axios.post(
      `${process.env.ROOT_URL}/api/accounts/password/reset`,
      validatedFields.data
    );

    if (response.data.status === "fail") {
      return {
        message: response.data.message,
      };
    }
  } catch (error) {
    return {
      message: "Password reset failed",
    };
  }

  redirect("/accounts/login");
}

export async function forgotPassword(
  formState: AccountInitialState,
  formData: FormData
) {
  const validatedFields = ForgotPassword.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Some field are invalid",
    };
  }

  try {
    const response = await axios.post(
      `${process.env.ROOT_URL}/api/accounts/password/forgot`,
      validatedFields.data
    );

    if (response.data.status === "fail") {
      return {
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log({ ERROR_RESET_INSTRUCTIONS: error });
    return {
      message: "Error sending reset instructions",
    };
  }

  redirect("/accounts/password/forgot?instructions_sent=true");
}

export async function changePassword(
  formState: AccountInitialState,
  formData: FormData
) {
  const validatedFields = ChangePassword.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Some required field are empty",
    };
  }

  try {
    // Request expects currentPassword and newPassword

    const data = {
      currentPassword: validatedFields.data.password,
      newPassword: validatedFields.data.confirmPassword,
    };
    const response = await axios.post(
      `${process.env.ROOT_URL}/api/accounts/password/change`,
      data,
      {
        headers: {
          Cookie: `access_token_auth=${getCookie("access_token_auth")}`,
        },
      }
    );

    if (response.data.status === "fail") {
      return {
        message: response.data.message,
      };
    }

    deleteCookie("access_token_auth");
  } catch (error: any) {
    console.log({ PASSWORD_CHANGE_ERROR: error });
    return {
      message: error.message,
    };
  }

  redirect("/accounts/login");
}
