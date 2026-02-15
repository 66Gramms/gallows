"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useRandomWord } from "@/hooks/use-random-word";
import { WordDifficulty } from "@/constants/general";
import Button from "@/components/molecules/button";
import Link from "next/link";

export default function GamePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const difficulty = Number(searchParams.get("difficulty"));

  const { data: word, isLoading, error } = useRandomWord(difficulty);

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
      </div>

      {word && (
        <div className="flex flex-col items-center gap-4 p-8 border-2 border-gray-300 dark:border-gray-700 rounded-lg">
          <h2 className="text-2xl font-semibold">Your Word:</h2>
          <p className="text-5xl font-bold text-amber-600 dark:text-amber-400">
            {word.word.toUpperCase()}
          </p>
          <p className="text-sm text-gray-500">
            Word ID: {word.id} | Difficulty: {word.difficulty}
          </p>
        </div>
      )}
    </div>
  );
}
