"use client";

import { useState } from "react";
import SignInForm from "./sign-in-form";
import SignUpForm from "./sign-up-form";
import Button from "@/components/molecules/button";

type AuthMode = "signin" | "signup";

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signin");

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="flex gap-2 mb-6">
        <Button
          onClick={() => setMode("signin")}
          className={mode === "signin" ? "opacity-100" : "opacity-50"}
        >
          Sign In
        </Button>
        <Button
          onClick={() => setMode("signup")}
          className={mode === "signup" ? "opacity-100" : "opacity-50"}
        >
          Sign Up
        </Button>
      </div>

      {mode === "signin" ? <SignInForm /> : <SignUpForm />}
    </div>
  );
}
