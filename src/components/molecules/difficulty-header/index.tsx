interface DifficultyHeaderProps {
  difficultyName: string;
  lengthRequirements: string;
}

export default function DifficultyHeader({
  difficultyName,
  lengthRequirements,
}: DifficultyHeaderProps) {
  return (
    <div className="mb-4">
      <h2 className="text-3xl font-bold mb-2">{difficultyName}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {lengthRequirements}
      </p>
    </div>
  );
}
