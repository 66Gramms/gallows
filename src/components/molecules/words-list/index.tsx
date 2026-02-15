import type { Word } from "@/lib/words";
import WordCard from "../word-card";

interface WordsListProps {
  words: Word[];
  isLoading: boolean;
  onUpdate: (id: number, word: string) => void;
  onDelete: (id: number) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export default function WordsList({
  words,
  isLoading,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: WordsListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">Loading words...</p>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="text-center py-8 border-2 border-dashed border-amber-300 dark:border-amber-700/30 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">
          No words yet. Add one above!
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {words.length} word{words.length !== 1 ? "s" : ""}
      </p>
      {words.map((word) => (
        <WordCard
          key={word.id}
          word={word}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
        />
      ))}
    </>
  );
}
