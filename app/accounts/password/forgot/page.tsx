"use client";

import { AccountInitialState, forgotPassword } from "@/app/actions/accounts";
import AccountFormError from "@/app/ui/acounts/account-form-error";
import AccountsFormSubmitButton from "@/app/ui/acounts/accounts_form_submit_button";
import FormFieldError from "@/app/ui/shared/form-field-error";
import Link from "next/link";
import React from "react";
import { useFormState } from "react-dom";

const ForgotPasswordPage = ({
  searchParams,
}: {
  searchParams: { instructions_sent: string };
}) => {
  const instructions_sent = searchParams.instructions_sent;
  const initialState: AccountInitialState = {
    errors: {},
    message: null,
  };
  const [state, handler] = useFormState(forgotPassword, initialState);

  console.log({ state });
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Forgot password
            </h1>
            <p className="mt-4 leading-relaxed text-gray-500">
              Forgot your password ? Enter the email used to create your account
              and we will send reset instructions
            </p>

            {instructions_sent === "true" ? (
              <div className="border-2 rounded-sm  mt-4 border-green-600 p-4 bg-green-400">
                <p className="leading-relaxed text-gray-900">
                  We have sent reset instructions to your email account
                </p>
              </div>
            ) : (
              <></>
            )}

            <AccountFormError state={state} />
            <form action={handler} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
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

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <AccountsFormSubmitButton title="Send Instructions" />
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  <Link
                    href="/accounts/login"
                    className="text-blue-700 underline"
                  >
                    Login?
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
