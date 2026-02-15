import { useQuery } from "@tanstack/react-query";
import { wordEndpoints, type Word } from "@/lib/words";

export function useRandomWord(difficulty?: number) {
  return useQuery({
    queryKey: ["word", "random", difficulty],
    queryFn: async () => {
      const { word, error } = await wordEndpoints.getRandomWord(difficulty);
      if (error) {
        throw error;
      }
      if (!word) {
        throw new Error("No words found for this difficulty");
      }
      return word as Word;
    },
    enabled: difficulty !== undefined,
    staleTime: 0, // Always fetch a new word
    gcTime: 0, // Don't cache the word
  });
}
