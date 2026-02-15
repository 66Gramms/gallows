"use client";

import Button from "@/components/molecules/button";

interface VirtualKeyboardProps {
  onLetterClick: (letter: string) => void;
  guessedLetters: Set<string>;
  disabled?: boolean;
}

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export default function VirtualKeyboard({
  onLetterClick,
  guessedLetters,
  disabled = false,
}: VirtualKeyboardProps) {
  return (
    <div className="flex flex-col gap-1 sm:gap-2 w-full max-w-2xl px-2 sm:px-4">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center gap-0.5 sm:gap-1 md:gap-2"
        >
          {row.map((letter) => {
            const isGuessed = guessedLetters.has(letter);
            return (
              <Button
                key={letter}
                onClick={() => onLetterClick(letter)}
                disabled={disabled || isGuessed}
                className={`
                  p-1 sm:p-2 md:p-3 text-sm sm:text-base md:text-lg
                  w-7 h-10 sm:w-10 sm:h-12 md:w-12 md:h-14
                  flex items-center justify-center
                  ${isGuessed ? "opacity-30 cursor-not-allowed" : ""}
                `}
              >
                {letter}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
