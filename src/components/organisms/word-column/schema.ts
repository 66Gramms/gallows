import { z } from "zod";
import { WordDifficulty } from "@/constants/general";
import { DIFFICULTY_CONFIG } from "@/constants/difficulty";

export const createWordSchema = (difficulty: WordDifficulty) => {
  const { minLength: min, maxLength: max } = DIFFICULTY_CONFIG[difficulty];

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
