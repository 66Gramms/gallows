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
    <div className="flex gap-1 sm:gap-2 flex-wrap justify-center px-2">
      {word.split("").map((letter, index) => {
        const isGuessed = guessedLetters.has(letter.toUpperCase());
        return (
          <div
            key={index}
            className="w-8 h-12 sm:w-10 sm:h-14 md:w-12 md:h-16 flex items-center justify-center border-b-2 sm:border-b-4 border-gray-400 dark:border-gray-600"
          >
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400">
              {isGuessed ? letter.toUpperCase() : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}
