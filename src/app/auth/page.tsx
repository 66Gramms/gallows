"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import AuthForm from "@/components/organisms/auth-form";
import UserProfile from "@/components/organisms/user-profile";

export default function AuthPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold">Authentication</h1>
        <Link
          href="/"
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          ← Back to home
        </Link>
      </div>

      {user ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-green-500">You are signed in!</p>
          <UserProfile />
        </div>
      ) : (
        <AuthForm />
      )}
    </div>
  );
}
