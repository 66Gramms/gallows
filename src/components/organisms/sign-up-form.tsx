"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@/hooks/use-auth-mutations";
import { signUpSchema, type SignUpFormData } from "@/app/auth/schema";
import Button from "@/components/molecules/button";

export default function SignUpForm() {
  const signUpMutation = useSignUp();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    signUpMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <input
          type="email"
          placeholder="Email"
          {...form.register("email")}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        />
        {form.formState.errors.email && (
          <span className="text-red-500 text-sm">
            {form.formState.errors.email.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="password"
          placeholder="Password"
          {...form.register("password")}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        />
        {form.formState.errors.password && (
          <span className="text-red-500 text-sm">
            {form.formState.errors.password.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="password"
          placeholder="Confirm Password"
          {...form.register("confirmPassword")}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        />
        {form.formState.errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {form.formState.errors.confirmPassword.message}
          </span>
        )}
      </div>

      {signUpMutation.error && (
        <div className="text-red-500 text-sm">
          {signUpMutation.error.message}
        </div>
      )}

      {signUpMutation.isSuccess && (
        <div className="text-green-500 text-sm">
          Check your email to confirm your account!
        </div>
      )}

      <Button
        type="submit"
        disabled={signUpMutation.isPending}
        className="w-full"
      >
        {signUpMutation.isPending ? "Loading..." : "Sign Up"}
      </Button>
    </form>
  );
}
