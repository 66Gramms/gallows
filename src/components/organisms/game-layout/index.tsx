import Button from "@/components/molecules/button";

interface GameLayoutProps {
  children: React.ReactNode;
  onBackToHome?: () => void;
}

export default function GameLayout({
  children,
  onBackToHome,
}: GameLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 p-4">
      {onBackToHome && (
        <div className="flex flex-col items-center gap-2">
          <Button
            onClick={onBackToHome}
            variant="secondary"
            className="text-sm sm:text-base"
          >
            ← Back to home
          </Button>
        </div>
      )}
      {children}
    </div>
  );
}
