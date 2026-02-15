"use client";

import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "p-4 text-2xl cursor-pointer rounded-sm border-2 transition-colors",
        "bg-amber-50 hover:bg-amber-100 border-amber-300 hover:border-amber-400",
        "dark:bg-amber-700/10 dark:hover:bg-amber-700/20 dark:border-amber-700/30 dark:hover:border-amber-700/50",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
