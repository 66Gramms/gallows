import { useQuery } from "@tanstack/react-query";
import { userProfileEndpoints } from "@/lib/user-profiles";
import { useAuth } from "@/components/providers/auth-provider";

export function useIsAdmin() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["isAdmin", user?.id],
    queryFn: async () => {
      if (!user) return false;
      return await userProfileEndpoints.isAdmin(user.id);
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });
}
