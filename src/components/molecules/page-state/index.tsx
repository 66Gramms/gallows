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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">{message || "Loading..."}</p>
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
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className={`text-3xl font-bold ${colorClass}`}>{title}</h1>
      {message && <p className="text-lg">{message}</p>}
      {details && <p className="text-sm text-gray-500">{details}</p>}
      {onAction ? (
        <Button onClick={onAction} variant="secondary">
          {actionLabel}
        </Button>
      ) : (
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          ← Back to home
        </Link>
      )}
    </div>
  );
}
