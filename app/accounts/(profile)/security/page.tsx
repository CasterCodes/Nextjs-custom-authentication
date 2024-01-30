import ChangePasswordForm from "@/app/ui/acounts/change_password_form";
import React from "react";

const AccountSecurityPage = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800">Security</h2>

      <div className="mt-8">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">
            Change Password
          </h3>
          <span className="inline-block leading-normal font-normal text-sm mt-8 md:max-w-lg text-gray-600">
            After you have successfully changed your password you will be logged
            out automatically
          </span>
        </div>
        <div className="mt-4 md:max-w-2xl">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default AccountSecurityPage;
