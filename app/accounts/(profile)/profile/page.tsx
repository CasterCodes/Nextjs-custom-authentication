import { logout } from "@/app/actions/accounts";
import { currentAccount } from "@/app/lib/account";
import Link from "next/link";
import React from "react";

const ProfilePage = async () => {
  const { user, error, message } = await currentAccount();

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800">Your Profile</h2>
      <div className="mt-8 flex flex-col space-y-2">
        <h2 className="text-2xl">
          <strong>Full Name : </strong>{" "}
          {`${user?.firstName}  ${user?.lastName}`}
        </h2>
        <h2 className="text-2xl">
          <strong>Email : </strong> {`${user?.email}`}
        </h2>
      </div>
      {error && (
        <>
          <h2>{message}</h2>
        </>
      )}
    </>
  );
};

export default ProfilePage;
