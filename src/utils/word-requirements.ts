import { WordDifficulty } from "@/constants/general";

export function getWordLengthRequirements(difficulty: WordDifficulty): string {
  const requirements = {
    [WordDifficulty.EASY]: "6-8 letters",
    [WordDifficulty.MEDIUM]: "9-11 letters",
    [WordDifficulty.HARD]: "12-14 letters",
  };

  return requirements[difficulty];
}
