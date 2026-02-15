import Link from "next/link";
import HomePage from "../components/pages/home";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xlpy-32 px-16 bg-white dark:bg-black sm:items-start mt-20">
        <div className="flex flex-col gap-20 items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-6xl text-center w-full">Gallows</h1>
            <h2 className="text-2xl text-center w-full">
              Choose a difficulty to start playing
            </h2>
            <Link
              href="/auth"
              className="text-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              Sign in or create an account
            </Link>
          </div>
          <HomePage />
        </div>
      </main>
    </div>
  );
}
