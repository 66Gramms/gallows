import { z } from "zod";
import { WordDifficulty } from "@/constants/general";

const WORD_LENGTH_REQUIREMENTS = {
  [WordDifficulty.EASY]: { min: 6, max: 8 },
  [WordDifficulty.MEDIUM]: { min: 9, max: 11 },
  [WordDifficulty.HARD]: { min: 12, max: 14 },
};

export const createWordSchema = (difficulty: WordDifficulty) => {
  const { min, max } = WORD_LENGTH_REQUIREMENTS[difficulty];

  return z.object({
    word: z
      .string()
      .min(1, "Word is required")
      .regex(/^[a-zA-Z]+$/, "Word must contain only letters")
      .min(min, `Word must be at least ${min} letters`)
      .max(max, `Word must be at most ${max} letters`)
      .transform((val) => val.toLowerCase()),
  });
};

export type WordFormData = z.infer<ReturnType<typeof createWordSchema>>;
