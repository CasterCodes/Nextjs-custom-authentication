import React from "react";

const AccountFormError = ({
  state,
}: {
  state: { errors?: {} | any; message?: string };
}) => {
  const fieldErrorsEmpty =
    state?.errors === undefined ||
    state?.errors === null ||
    Object.keys(state?.errors).length === 0;

  if (!fieldErrorsEmpty || !state?.message) return <></>;

  return (
    <div className="bg-red-200 p-3 rounded-sm mt-4">
      <h2 className="text-gray-900">{state.message}</h2>
    </div>
  );
};

export default AccountFormError;
