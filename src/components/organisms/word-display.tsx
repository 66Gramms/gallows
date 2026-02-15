"use client";

interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
}

export default function WordDisplay({
  word,
  guessedLetters,
}: WordDisplayProps) {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {word.split("").map((letter, index) => {
        const isGuessed = guessedLetters.has(letter.toUpperCase());
        return (
          <div
            key={index}
            className="w-12 h-16 flex items-center justify-center border-b-4 border-gray-400 dark:border-gray-600"
          >
            <span className="text-4xl font-bold text-amber-600 dark:text-amber-400">
              {isGuessed ? letter.toUpperCase() : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}
