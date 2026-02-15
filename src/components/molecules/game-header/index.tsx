import MistakeIndicator from "../mistake-indicator";
import Gallows from "../gallows";

interface GameHeaderProps {
  difficulty: string;
  mistakes: number;
  maxMistakes: number;
}

export default function GameHeader({
  difficulty,
  mistakes,
  maxMistakes,
}: GameHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold">Gallows Game</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Difficulty: {difficulty}
      </p>
      <Gallows mistakes={mistakes} />
      <MistakeIndicator current={mistakes} max={maxMistakes} />
    </div>
  );
}
