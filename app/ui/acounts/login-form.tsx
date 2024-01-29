import { AccountInitialState, loginUser } from "@/app/actions/accounts";
import Link from "next/link";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import FormFieldError from "../shared/form-field-error";
import AccountsFormSubmitButton from "./accounts_form_submit_button";

const LoginForm = () => {
  const initialState: AccountInitialState = {
    errors: {},
    message: null,
  };

  const [state, handler] = useFormState(loginUser, initialState);

  return (
    <form action={handler} className="mt-8 grid grid-cols-6 gap-6">
      <div className="col-span-6">
        <label
          htmlFor="Email"
          className="block text-sm font-medium text-gray-700"
        >
          {" "}
          Email{" "}
        </label>

        <input
          type="email"
          id="Email"
          name="email"
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
        <FormFieldError messages={state?.errors?.email} />
      </div>

      <div className="col-span-6">
        <label
          htmlFor="Password"
          className="block text-sm font-medium text-gray-700"
        >
          {" "}
          Password{" "}
        </label>

        <input
          type="password"
          id="Password"
          name="password"
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
        <FormFieldError messages={state?.errors?.password} />
      </div>

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <AccountsFormSubmitButton title="Login" />
        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
          Don't have account yet?
          <Link href="/accounts/create" className="text-gray-700 underline">
            Create Account
          </Link>
          .
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
