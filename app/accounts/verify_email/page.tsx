"use client";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const search = useSearchParams();
  const token = search.get("token");
  const verified = search.get("verified");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/accounts/verify_email", {
          token,
        });

        if (response.data.status === "success") {
          router.push(`/accounts/verify_email?token=${token}&verified=true`);
        } else {
          router.push(`/accounts/verify_email?token=${token}&verified=false`);
        }

        setLoading(false);
      } catch (error) {
        router.push(`/accounts/verify_email?token=${token}&verified=false`);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <section className="flex justify-center items-center h-[100vh]">
      {verified === "true" && !loading ? (
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Your email was verified
            </h2>

            <p className="hidden text-gray-500 sm:mt-4 sm:block">
              Proceed to
              <Link
                className="inline-block ml-2 text-blue-500"
                href="/accounts/login"
              >
                login
              </Link>
            </p>
          </div>
        </div>
      ) : loading ? (
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-2xl font-bold text-gray-600">
            Verifying your email
          </h2>
          <p className="mt-4 text-xl font-semibold text-gray-500">
            This will only take a minute
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-2xl font-bold text-gray-600">
            Error Verifying your Email
          </h2>
          <p className="mt-4 text-xl font-semibold text-gray-500">
            This will only take a minute
          </p>
        </div>
      )}
    </section>
  );
};

export default VerifyEmailPage;
