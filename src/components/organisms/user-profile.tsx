"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useSignOut } from "@/hooks/use-auth-mutations";
import Button from "@/components/molecules/button";

export default function UserProfile() {
  const { user, loading } = useAuth();
  const signOutMutation = useSignOut();

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{user.email}</span>
        <span className="text-xs text-gray-500">
          {user.user_metadata?.full_name || "User"}
        </span>
      </div>
      <Button onClick={handleSignOut} disabled={signOutMutation.isPending}>
        {signOutMutation.isPending ? "Signing out..." : "Sign Out"}
      </Button>
    </div>
  );
}
