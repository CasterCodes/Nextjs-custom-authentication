import React from "react";

const FormFieldError = ({ messages }: { messages?: string[] }) => {
  return (
    <>
      {messages &&
        messages?.map((error: string) => (
          <span key={error} className="inline-block mt-2 text-red-400 text-sm">
            {error}
          </span>
        ))}
    </>
  );
};

export default FormFieldError;
