import { useQuery } from "@tanstack/react-query";
import { wordEndpoints, type Word } from "@/lib/words";
import { QueryKeys } from "@/constants/query-keys";

export function useRandomWord(difficulty?: number) {
  return useQuery({
    queryKey: [QueryKeys.WORD_RANDOM, difficulty],
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
    staleTime: 0,
    gcTime: 0,
  });
}
