"use client";

import { AccountInitialState, createUserAccount } from "@/app/actions/accounts";
import Link from "next/link";
import React from "react";
import { useFormState } from "react-dom";
import FormFieldError from "../shared/form-field-error";
import AccountsFormSubmitButton from "./accounts_form_submit_button";
import AccountFormError from "./account-form-error";

const CreateAccountForm = () => {
  const initialState: AccountInitialState = { errors: {}, message: null };

  // @ts-ignore
  const [state, handler] = useFormState(createUserAccount, initialState);

  return (
    <>
      <AccountFormError state={state} />
      <form action={handler} className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="FirstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>

          <input
            type="text"
            id="FirstName"
            name="firstName"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
          <FormFieldError messages={state?.errors?.firstName} />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="LastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>

          <input
            type="text"
            id="LastName"
            name="lastName"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
          <FormFieldError messages={state?.errors?.lastName} />
        </div>

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

        <div className="col-span-6 sm:col-span-3">
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

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Password Confirmation
          </label>

          <input
            type="password"
            id="PasswordConfirmation"
            name="confirmPassword"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
          <FormFieldError messages={state?.errors?.confirmPassword} />
        </div>

        <div className="col-span-6">
          <label htmlFor="MarketingAccept" className="flex gap-4">
            <input
              type="checkbox"
              id="MarketingAccept"
              name="marketing_accept"
              className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
            />

            <span className="text-sm text-gray-700">
              I want to receive emails about events, product updates and company
              announcements.
            </span>
          </label>
        </div>

        <div className="col-span-6">
          <p className="text-sm text-gray-500">
            By creating an account, you agree to our
            <a href="#" className="text-gray-700 underline">
              {" "}
              terms and conditions{" "}
            </a>
            and
            <a href="#" className="text-gray-700 underline">
              privacy policy
            </a>
            .
          </p>
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <AccountsFormSubmitButton title="Create Account" />
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

export default CreateAccountForm;
