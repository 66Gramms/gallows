"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@/hooks/use-auth-mutations";
import { signInSchema, type SignInFormData } from "@/app/auth/schema";
import Button from "@/components/molecules/button";
import Input from "@/components/molecules/input";

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
