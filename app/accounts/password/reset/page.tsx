import ResetPasswordForm from "@/app/ui/acounts/reset_password_form";
import { redirect } from "next/navigation";

const PasswordResetPage = ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const { token } = searchParams;

  if (!token) redirect("/accounts/login");

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Set a new password
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Create a new password to login
            </p>

            <ResetPasswordForm token={token} />
          </div>
        </main>
      </div>
    </section>
  );
};

export default PasswordResetPage;
