import { useMutation } from "@tanstack/react-query";
import { authEndpoints } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const { error } = await authEndpoints.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      router.push("/");
    },
  });
}
