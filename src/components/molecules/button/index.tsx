"use client";

import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "p-4 text-2xl cursor-pointer rounded-sm border-2 transition-colors",
        "bg-amber-50 hover:bg-amber-100 border-amber-300 hover:border-amber-400",
        "dark:bg-amber-700/10 dark:hover:bg-amber-700/20 dark:border-amber-700/30 dark:hover:border-amber-700/50",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
