import Button from "@/components/molecules/button";
import { GameStatus } from "@/constants/general";

interface GameResultProps {
  status: GameStatus.WON | GameStatus.LOST;
  word: string;
  onRestart: () => void;
  onGoHome: () => void;
}

export default function GameResult({
  status,
  word,
  onRestart,
  onGoHome,
}: GameResultProps) {
  const isWon = status === GameStatus.WON;

  const config = {
    won: {
      bgColor: "bg-green-100 dark:bg-green-900/20",
      borderColor: "border-green-500",
      textColor: "text-green-600 dark:text-green-400",
      emoji: "🎉",
      title: "You Won!",
      buttonText: "Play Again",
    },
    lost: {
      bgColor: "bg-red-100 dark:bg-red-900/20",
      borderColor: "border-red-500",
      textColor: "text-red-600 dark:text-red-400",
      emoji: "😞",
      title: "Game Over",
      buttonText: "Try Again",
    },
  };

  const currentConfig = isWon ? config.won : config.lost;

  return (
    <div
      className={`flex flex-col items-center gap-4 p-6 ${currentConfig.bgColor} border-2 ${currentConfig.borderColor} rounded-lg`}
    >
      <h2 className={`text-3xl font-bold ${currentConfig.textColor}`}>
        {currentConfig.emoji} {currentConfig.title}
      </h2>
      <p className="text-lg">The word was: {word.toUpperCase()}</p>
      <div className="flex flex-col gap-2 w-full">
        <Button onClick={onRestart} className="w-full">
          {currentConfig.buttonText}
        </Button>
        <Button onClick={onGoHome} variant="secondary" className="w-full">
          Go Home
        </Button>
      </div>
    </div>
  );
}
