import { WordDifficulty } from "@/constants/general";

export interface DifficultyConfig {
  value: WordDifficulty;
  name: string;
  description: string;
  minLength: number;
  maxLength: number;
}

export const DIFFICULTY_CONFIG: Record<WordDifficulty, DifficultyConfig> = {
  [WordDifficulty.EASY]: {
    value: WordDifficulty.EASY,
    name: "Easy",
    description: "6-8 letters",
    minLength: 6,
    maxLength: 8,
  },
  [WordDifficulty.MEDIUM]: {
    value: WordDifficulty.MEDIUM,
    name: "Medium",
    description: "9-11 letters",
    minLength: 9,
    maxLength: 11,
  },
  [WordDifficulty.HARD]: {
    value: WordDifficulty.HARD,
    name: "Hard",
    description: "12-14 letters",
    minLength: 12,
    maxLength: 14,
  },
};

export const DIFFICULTY_OPTIONS: DifficultyConfig[] = Object.values(DIFFICULTY_CONFIG);

export function getDifficultyName(difficulty: WordDifficulty): string {
  return DIFFICULTY_CONFIG[difficulty]?.name ?? "Unknown";
}

export function getWordLengthRequirements(difficulty: WordDifficulty): string {
  return DIFFICULTY_CONFIG[difficulty]?.description ?? "";
}
