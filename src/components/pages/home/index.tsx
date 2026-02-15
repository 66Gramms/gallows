"use client";

import { useRouter } from "next/navigation";
import Button from "../../molecules/button";
import { WordDifficulty } from "@/constants/general";

const HomePage = () => {
  const router = useRouter();

  const handleDifficultySelect = (difficulty: WordDifficulty) => {
    router.push(`/game?difficulty=${difficulty}`);
  };

  return (
    <div className="flex flex-col gap-4 max-w-[512px] items-center justify-center w-full">
      <Button
        className="w-full"
        onClick={() => handleDifficultySelect(WordDifficulty.EASY)}
      >
        Easy <span className="text-sm">(6-8 letters)</span>
      </Button>
      <Button
        className="w-full"
        onClick={() => handleDifficultySelect(WordDifficulty.MEDIUM)}
      >
        Medium <span className="text-sm">(9-11 letters)</span>
      </Button>
      <Button
        className="w-full"
        onClick={() => handleDifficultySelect(WordDifficulty.HARD)}
      >
        Hard <span className="text-sm">(12-14 letters)</span>
      </Button>
    </div>
  );
};

export default HomePage;
