import { WordDifficulty } from "@/constants/general";

export function getDifficultyName(difficulty: WordDifficulty): string {
  switch (difficulty) {
    case WordDifficulty.EASY:
      return "Easy";
    case WordDifficulty.MEDIUM:
      return "Medium";
    case WordDifficulty.HARD:
      return "Hard";
    default:
      return "Unknown";
  }
}
