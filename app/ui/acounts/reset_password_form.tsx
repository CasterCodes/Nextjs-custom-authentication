"use client";

import { AccountInitialState, resetPassword } from "@/app/actions/accounts";
import React from "react";
import { useFormState } from "react-dom";
import AccountsFormSubmitButton from "./accounts_form_submit_button";
import Link from "next/link";
import AccountFormError from "./account-form-error";
import FormFieldError from "../shared/form-field-error";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const initialState: AccountInitialState = {
    errors: {},
    message: null,
  };

  const [state, handler] = useFormState(resetPassword, initialState);
  return (
    <>
      <AccountFormError state={state} />
      <form action={handler} className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New password{" "}
          </label>

          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
          <FormFieldError messages={state?.errors?.password} />
        </div>
        <div className="col-span-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm new password
          </label>

          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
          <FormFieldError messages={state?.errors?.confirmPassword} />
        </div>
        <input
          type="hidden"
          id="token"
          name="token"
          value={token}
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <AccountsFormSubmitButton title="Reset" />

          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Already have an account?
            <Link href="/accounts/login" className="text-gray-700 underline">
              Log in
            </Link>
            .
          </p>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordForm;
