"use client";

import { useRouter } from "next/navigation";
import Button from "../../molecules/button";
import { DIFFICULTY_OPTIONS } from "@/utils/difficulty-config";

const HomePage = () => {
  const router = useRouter();

  const handleDifficultySelect = (difficulty: number) => {
    router.push(`/game?difficulty=${difficulty}`);
  };

  return (
    <div className="flex flex-col gap-4 max-w-[512px] items-center justify-center w-full">
      {DIFFICULTY_OPTIONS.map((option) => (
        <Button
          key={option.value}
          className="w-full"
          onClick={() => handleDifficultySelect(option.value)}
        >
          {option.name} <span className="text-sm">({option.description})</span>
        </Button>
      ))}
    </div>
  );
};

export default HomePage;
