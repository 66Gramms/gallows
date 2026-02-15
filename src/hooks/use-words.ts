import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { wordEndpoints, type Word } from "@/lib/words";
import { QueryKeys } from "@/constants/query-keys";

export function useWordsByDifficulty(difficulty: number) {
  return useQuery({
    queryKey: [QueryKeys.WORDS, difficulty],
    queryFn: async () => {
      const { words, error } = await wordEndpoints.getWordsByDifficulty(
        difficulty
      );
      if (error) throw error;
      return words || [];
    },
  });
}

export function useCreateWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ word, difficulty }: { word: string; difficulty: number }) => {
      const { word: createdWord, error } = await wordEndpoints.createWord(
        word,
        difficulty
      );
      if (error) throw error;
      return createdWord;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.WORDS, variables.difficulty],
      });
    },
  });
}

export function useUpdateWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: number;
      updates: Partial<Omit<Word, "id">>;
    }) => {
      const { word, error } = await wordEndpoints.updateWord(id, updates);
      if (error) throw error;
      return word;
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.WORDS, data.difficulty],
        });
      }
    },
  });
}

export function useDeleteWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, difficulty }: { id: number; difficulty: number }) => {
      const { error } = await wordEndpoints.deleteWord(id);
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.WORDS, variables.difficulty],
      });
    },
  });
}
