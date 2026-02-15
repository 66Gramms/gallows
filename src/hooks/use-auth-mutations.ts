import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authEndpoints, type SignInData, type SignUpData } from "@/lib/auth";
import { QueryKeys } from "@/constants/query-keys";

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignUpData) => {
      const result = await authEndpoints.signUp(data);
      if (result.error) {
        throw result.error;
      }
      return result.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] });
    },
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignInData) => {
      const result = await authEndpoints.signIn(data);
      if (result.error) {
        throw result.error;
      }
      return result.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] });
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const result = await authEndpoints.signOut();
      if (result.error) {
        throw result.error;
      }
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AUTH] });
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      const result = await authEndpoints.resetPassword(email);
      if (result.error) {
        throw result.error;
      }
      return true;
    },
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: async (newPassword: string) => {
      const result = await authEndpoints.updatePassword(newPassword);
      if (result.error) {
        throw result.error;
      }
      return true;
    },
  });
}
