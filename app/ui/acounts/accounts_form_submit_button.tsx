"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const AccountsFormSubmitButton = ({ title }: { title: string }) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      role="submit"
      type="submit"
      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium disabled:bg-blue-500 text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none  active:text-blue-500"
    >
      {pending ? "Loading" : title}
    </button>
  );
};

export default AccountsFormSubmitButton;
