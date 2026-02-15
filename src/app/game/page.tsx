"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useRandomWord } from "@/hooks/use-random-word";
import { WordDifficulty, GameStatus, MAX_MISTAKES } from "@/constants/general";
import VirtualKeyboard from "@/components/organisms/virtual-keyboard";
import WordDisplay from "@/components/organisms/word-display";
import GameLayout from "@/components/organisms/game-layout";
import GameHeader from "@/components/molecules/game-header";
import GameResult from "@/components/organisms/game-result";
import PageState from "@/components/molecules/page-state";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  initializeGame,
  guessLetter,
  resetGame,
} from "@/store/slices/game-slice";
import { getDifficultyName } from "@/constants/difficulty";

export default function GamePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const difficulty = Number(searchParams.get("difficulty"));

  const dispatch = useAppDispatch();
  const {
    word: storedWord,
    difficulty: storedDifficulty,
    guessedLetters,
    mistakes,
    gameStatus,
  } = useAppSelector((state) => state.game);

  const shouldFetch = !storedWord || storedDifficulty !== difficulty;
  const {
    data: fetchedWord,
    isLoading,
    error,
  } = useRandomWord(shouldFetch ? difficulty : undefined);

  useEffect(() => {
    if (fetchedWord && difficulty) {
      dispatch(initializeGame({ difficulty, word: fetchedWord.word }));
    }
  }, [fetchedWord, difficulty, dispatch]);

  const currentWord =
    storedWord && storedDifficulty === difficulty
      ? storedWord
      : fetchedWord?.word;

  const handleLetterClick = (letter: string) => {
    if (gameStatus !== GameStatus.PLAYING || !currentWord) return;
    dispatch(guessLetter(letter));
  };

  const handleRestart = () => {
    dispatch(resetGame());
  };

  const handleGoHome = () => {
    dispatch(resetGame());
    router.push("/");
  };

  if (!difficulty || !Object.values(WordDifficulty).includes(difficulty)) {
    return <PageState state="invalid" title="Invalid Difficulty" />;
  }

  if (isLoading) {
    return <PageState state="loading" message="Loading word..." />;
  }

  if (error) {
    return (
      <PageState
        state="error"
        title="Error"
        message={error instanceof Error ? error.message : "Failed to load word"}
        details={`Difficulty: ${difficulty} (${getDifficultyName(difficulty)})`}
        onAction={() => router.push("/")}
      />
    );
  }

  if (!currentWord) {
    return (
      <PageState
        state="empty"
        title="No Word Found"
        message={`No words available for difficulty: ${getDifficultyName(difficulty)}`}
        details={`Please add words to the database for difficulty level ${difficulty}`}
        onAction={() => router.push("/")}
      />
    );
  }

  const guessedLettersSet = new Set(guessedLetters);

  return (
    <GameLayout onBackToHome={handleGoHome}>
      <GameHeader
        difficulty={getDifficultyName(difficulty)}
        mistakes={mistakes}
        maxMistakes={MAX_MISTAKES}
      />

      {gameStatus === GameStatus.WON && (
        <GameResult
          status={GameStatus.WON}
          word={currentWord}
          onRestart={handleRestart}
          onGoHome={handleGoHome}
        />
      )}

      {gameStatus === GameStatus.LOST && (
        <GameResult
          status={GameStatus.LOST}
          word={currentWord}
          onRestart={handleRestart}
          onGoHome={handleGoHome}
        />
      )}

      {gameStatus === GameStatus.PLAYING && (
        <>
          <WordDisplay word={currentWord} guessedLetters={guessedLettersSet} />
          <VirtualKeyboard
            onLetterClick={handleLetterClick}
            guessedLetters={guessedLettersSet}
            disabled={gameStatus !== GameStatus.PLAYING}
          />
        </>
      )}
    </GameLayout>
  );
}
