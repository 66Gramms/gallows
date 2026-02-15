"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useRandomWord } from "@/hooks/use-random-word";
import { WordDifficulty, GameStatus } from "@/constants/general";
import Button from "@/components/molecules/button";
import Link from "next/link";
import VirtualKeyboard from "@/components/organisms/virtual-keyboard";
import WordDisplay from "@/components/organisms/word-display";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/query-keys";

const MAX_MISTAKES = 6;

export default function GamePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const difficulty = Number(searchParams.get("difficulty"));

  const { data: word, isLoading, error, refetch } = useRandomWord(difficulty);

  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.PLAYING,
  );

  const getDifficultyName = (diff: number) => {
    switch (diff) {
      case WordDifficulty.EASY:
        return "Easy";
      case WordDifficulty.MEDIUM:
        return "Medium";
      case WordDifficulty.HARD:
        return "Hard";
      default:
        return "Unknown";
    }
  };

  const handleLetterClick = (letter: string) => {
    if (gameStatus !== GameStatus.PLAYING || !word) return;

    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    const isCorrectGuess = word.word.toUpperCase().includes(letter);
    const newMistakes = isCorrectGuess ? mistakes : mistakes + 1;

    if (!isCorrectGuess) {
      setMistakes(newMistakes);
    }

    // Check for loss
    if (newMistakes >= MAX_MISTAKES) {
      setGameStatus(GameStatus.LOST);
      return;
    }

    // Check for win
    const wordLetters = word.word.toUpperCase().split("");
    const allLettersGuessed = wordLetters.every((l) => newGuessed.has(l));

    if (allLettersGuessed) {
      setGameStatus(GameStatus.WON);
    }
  };

  const handleRestart = () => {
    setGuessedLetters(new Set());
    setMistakes(0);
    setGameStatus(GameStatus.PLAYING);
    queryClient.invalidateQueries({
      queryKey: [QueryKeys.WORD_RANDOM, difficulty],
    });
    refetch();
  };


  if (!difficulty || !Object.values(WordDifficulty).includes(difficulty)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Invalid Difficulty</h1>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          ← Back to home
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading word...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-red-500">Error</h1>
        <p className="text-lg">
          {error instanceof Error ? error.message : "Failed to load word"}
        </p>
        <p className="text-sm text-gray-500">
          Difficulty: {difficulty} ({getDifficultyName(difficulty)})
        </p>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    );
  }

  if (!word) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-yellow-500">No Word Found</h1>
        <p className="text-lg">
          No words available for difficulty: {getDifficultyName(difficulty)}
        </p>
        <p className="text-sm text-gray-500">
          Please add words to the database for difficulty level {difficulty}
        </p>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-4">
      <div className="flex flex-col items-center gap-2">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          ← Back to home
        </Link>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">Gallows Game</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Difficulty: {getDifficultyName(difficulty)}
        </p>
        <div className="flex gap-4 items-center">
          <p className="text-lg font-semibold">
            Mistakes: {mistakes} / {MAX_MISTAKES}
          </p>
          <div className="flex gap-1">
            {Array.from({ length: MAX_MISTAKES }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < mistakes ? "bg-red-500" : "bg-gray-300 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {gameStatus === GameStatus.WON && (
        <div className="flex flex-col items-center gap-4 p-6 bg-green-100 dark:bg-green-900/20 border-2 border-green-500 rounded-lg">
          <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">
            🎉 You Won!
          </h2>
          <p className="text-lg">The word was: {word.word.toUpperCase()}</p>
          <Button onClick={handleRestart} className="w-full">
            Play Again
          </Button>
        </div>
      )}

      {gameStatus === GameStatus.LOST && (
        <div className="flex flex-col items-center gap-4 p-6 bg-red-100 dark:bg-red-900/20 border-2 border-red-500 rounded-lg">
          <h2 className="text-3xl font-bold text-red-600 dark:text-red-400">
            😞 Game Over
          </h2>
          <p className="text-lg">The word was: {word.word.toUpperCase()}</p>
          <Button onClick={handleRestart} className="w-full">
            Try Again
          </Button>
        </div>
      )}

      {gameStatus === GameStatus.PLAYING && (
        <>
          <WordDisplay word={word.word} guessedLetters={guessedLetters} />
          <VirtualKeyboard
            onLetterClick={handleLetterClick}
            guessedLetters={guessedLetters}
            disabled={gameStatus !== GameStatus.PLAYING}
          />
        </>
      )}
    </div>
  );
}
