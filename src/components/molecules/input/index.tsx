"use client";

import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({ className, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <input
        className={clsx(
          "px-4 py-2 rounded border transition-colors",
          "border-gray-300 dark:border-gray-700",
          "bg-white dark:bg-gray-800",
          "focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error && "border-red-500 dark:border-red-500",
          className
        )}
        {...props}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
