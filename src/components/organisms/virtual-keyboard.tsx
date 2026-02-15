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
    <div className="flex flex-col gap-2 w-full max-w-2xl">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2">
          {row.map((letter) => {
            const isGuessed = guessedLetters.has(letter);
            return (
              <Button
                key={letter}
                onClick={() => onLetterClick(letter)}
                disabled={disabled || isGuessed}
                className={`
                  p-2 text-lg w-12 h-12 flex items-center justify-center
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
