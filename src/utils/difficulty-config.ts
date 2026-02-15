import { WordDifficulty } from "@/constants/general";

export interface DifficultyConfig {
  value: WordDifficulty;
  name: string;
  description: string;
}

export const DIFFICULTY_OPTIONS: DifficultyConfig[] = [
  {
    value: WordDifficulty.EASY,
    name: "Easy",
    description: "6-8 letters",
  },
  {
    value: WordDifficulty.MEDIUM,
    name: "Medium",
    description: "9-11 letters",
  },
  {
    value: WordDifficulty.HARD,
    name: "Hard",
    description: "12-14 letters",
  },
];
