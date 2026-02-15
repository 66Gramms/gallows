"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@/hooks/use-auth-mutations";
import { signInSchema, type SignInFormData } from "@/app/auth/schema";
import Button from "@/components/molecules/button";

export default function SignInForm() {
  const signInMutation = useSignIn();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInFormData) => {
    signInMutation.mutate(data);
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

      {signInMutation.error && (
        <div className="text-red-500 text-sm">
          {signInMutation.error.message}
        </div>
      )}

      {signInMutation.isSuccess && (
        <div className="text-green-500 text-sm">Signed in successfully!</div>
      )}

      <Button
        type="submit"
        disabled={signInMutation.isPending}
        className="w-full"
      >
        {signInMutation.isPending ? "Loading..." : "Sign In"}
      </Button>
    </form>
  );
}
