import Link from "next/link";

interface AdminHeaderProps {
  userEmail: string;
}

export default function AdminHeader({ userEmail }: AdminHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Admin Panel
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 break-all">
            Logged in as: {userEmail}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm sm:text-base text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
        Manage words for the Gallows game
      </p>
    </div>
  );
}
