"use client";

import { useRouter } from "next/navigation";
import { useAdminAccess } from "@/hooks/use-admin-access";
import AdminHeader from "@/components/organisms/admin-header";
import WordManagementGrid from "@/components/organisms/word-management-grid";
import PageState from "@/components/molecules/page-state";

export default function AdminPage() {
  const router = useRouter();
  const { user, isLoading, hasAccess, isAuthenticated } = useAdminAccess();

  if (isLoading) {
    return <PageState type="loading" message="Checking permissions..." />;
  }

  if (!isAuthenticated) {
    return (
      <PageState
        type="error"
        title="Unauthorized"
        message="You must be logged in to access this page."
        onAction={() => router.push("/auth")}
        actionLabel="Go to Login"
      />
    );
  }

  if (!hasAccess) {
    return (
      <PageState
        type="error"
        title="Access Denied"
        message="You do not have permission to access this page."
        onAction={() => router.push("/")}
        actionLabel="Go to Home"
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <AdminHeader userEmail={user!.email!} />
        <WordManagementGrid />
      </div>
    </div>
  );
}
