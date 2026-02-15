import Link from "next/link";
import { useLogout } from "@/hooks/use-logout";
import type { User } from "@supabase/supabase-js";

interface UserMenuProps {
  user: User | null;
  isAdmin?: boolean;
}

export default function UserMenu({ user, isAdmin }: UserMenuProps) {
  const logout = useLogout();

  if (!user) {
    return (
      <Link
        href="/auth"
        className="text-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
      >
        Sign in or create an account
      </Link>
    );
  }

  return (
    <>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Logged in as: {user.email}
      </p>
      {isAdmin && (
        <Link
          href="/admin"
          className="text-center text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 underline font-semibold"
        >
          🔧 Admin Panel
        </Link>
      )}
      <button
        onClick={() => logout.mutate()}
        disabled={logout.isPending}
        className="text-center text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 underline disabled:text-gray-400"
      >
        {logout.isPending ? "Logging out..." : "Logout"}
      </button>
    </>
  );
}
