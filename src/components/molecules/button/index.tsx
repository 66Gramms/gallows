"use client";

import clsx from "clsx";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: clsx(
    "bg-amber-50 hover:bg-amber-100 border-amber-300 hover:border-amber-400",
    "dark:bg-amber-700/10 dark:hover:bg-amber-700/20 dark:border-amber-700/30 dark:hover:border-amber-700/50"
  ),
  secondary: clsx(
    "bg-gray-100 hover:bg-gray-200 border-gray-300 hover:border-gray-400",
    "dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500"
  ),
  danger: clsx(
    "bg-red-50 hover:bg-red-100 border-red-300 hover:border-red-400",
    "dark:bg-red-900/10 dark:hover:bg-red-900/20 dark:border-red-700/30 dark:hover:border-red-700/50"
  ),
  success: clsx(
    "bg-green-50 hover:bg-green-100 border-green-300 hover:border-green-400",
    "dark:bg-green-900/10 dark:hover:bg-green-900/20 dark:border-green-700/30 dark:hover:border-green-700/50"
  ),
};

const Button = ({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "p-4 text-2xl cursor-pointer rounded-sm border-2 transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
