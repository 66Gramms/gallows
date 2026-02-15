"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@/hooks/use-auth-mutations";
import { signUpSchema, type SignUpFormData } from "@/app/auth/schema";
import Button from "@/components/molecules/button";
import Input from "@/components/molecules/input";

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
      <Input
        type="email"
        placeholder="Email"
        error={form.formState.errors.email?.message}
        {...form.register("email")}
      />

      <Input
        type="password"
        placeholder="Password"
        error={form.formState.errors.password?.message}
        {...form.register("password")}
      />

      <Input
        type="password"
        placeholder="Confirm Password"
        error={form.formState.errors.confirmPassword?.message}
        {...form.register("confirmPassword")}
      />

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
