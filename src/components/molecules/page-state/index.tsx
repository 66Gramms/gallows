import Link from "next/link";
import Button from "../button";

interface PageStateProps {
  type: "loading" | "error" | "empty" | "invalid";
  title?: string;
  message?: string;
  details?: string;
  onAction?: () => void;
  actionLabel?: string;
}

export default function PageState({
  type,
  title,
  message,
  details,
  onAction,
  actionLabel = "Back to Home",
}: PageStateProps) {
  if (type === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-base sm:text-lg md:text-xl">{message || "Loading..."}</p>
      </div>
    );
  }

  const colorClass =
    type === "error"
      ? "text-red-500"
      : type === "empty"
        ? "text-yellow-500"
        : "";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 sm:gap-4 px-4">
      <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${colorClass} text-center`}>{title}</h1>
      {message && <p className="text-sm sm:text-base md:text-lg text-center max-w-md">{message}</p>}
      {details && <p className="text-xs sm:text-sm text-gray-500 text-center max-w-md">{details}</p>}
      {onAction ? (
        <Button onClick={onAction} variant="secondary">
          {actionLabel}
        </Button>
      ) : (
        <Link
          href="/"
          className="text-sm sm:text-base text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          ← Back to home
        </Link>
      )}
    </div>
  );
}
