import { useAuth } from "@/components/providers/auth-provider";
import { useIsAdmin } from "./use-is-admin";

export function useAdminAccess() {
  const { user, loading: authLoading } = useAuth();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();

  const isLoading = authLoading || adminLoading;
  const hasAccess = !!user && isAdmin;

  return {
    user,
    isAdmin,
    isLoading,
    hasAccess,
    isAuthenticated: !!user,
  };
}
