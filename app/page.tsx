import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-extrabold sm:text-5xl">
            A complete custom nextjs Authentication flow
          </h1>
          <p className="text-xl mt-2 font-semibold">
            <strong className="font-semibold text-red-700 sm:block">
              Login. Register. Change Password . Forgot password . Reset
              password . Email verification
            </strong>
          </p>

          <p className="mt-4 sm:text-xl/relaxed">
            This is an example on how to add authentication and authorization
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/get-started"
            >
              Github Code
            </a>

            <Link
              className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              href="/accounts/create"
            >
              Test Auth
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
