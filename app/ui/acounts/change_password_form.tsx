"use client";

import React from "react";
import AccountsFormSubmitButton from "./accounts_form_submit_button";
import { AccountInitialState, changePassword } from "@/app/actions/accounts";
import { useFormState } from "react-dom";
import FormFieldError from "../shared/form-field-error";
import AccountFormError from "./account-form-error";

const ChangePasswordForm = () => {
  const initialState: AccountInitialState = { errors: {}, message: null };
  // @ts-ignore
  const [state, handler] = useFormState(changePassword, initialState);

  return (
    <>
      <AccountFormError state={state} />
      <form action={handler} className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Current password{" "}
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
            New password
          </label>

          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
          <FormFieldError messages={state?.errors?.confirmPassword} />
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <AccountsFormSubmitButton title="Change password" />
        </div>
      </form>
    </>
  );
};

export default ChangePasswordForm;
