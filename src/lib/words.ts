import { WordDifficulty } from "@/constants/general";
import { supabase } from "./supabase";
import type { PostgrestError } from "@supabase/supabase-js";

export interface Word {
  id: number;
  word: string;
  difficulty: WordDifficulty;
}

export interface WordsResponse {
  words: Word[] | null;
  error: PostgrestError | null;
}

export interface WordResponse {
  word: Word | null;
  error: PostgrestError | null;
}

export const wordEndpoints = {
  async getWordsByDifficulty(difficulty: number): Promise<WordsResponse> {
    const { data, error } = await supabase
      .from("words")
      .select("*")
      .eq("difficulty", difficulty)
      .order("word", { ascending: true });

    return { words: data, error };
  },

  async getRandomWord(difficulty: number): Promise<WordResponse> {
    const { data, error } = await supabase
      .rpc("get_random_word", {
        difficulty_param: difficulty,
      })
      .single();

    return { word: data as Word | null, error };
  },

  async createWord(word: string, difficulty: number): Promise<WordResponse> {
    const { data, error } = await supabase
      .from("words")
      .insert({ word, difficulty })
      .select()
      .single();

    return { word: data, error };
  },

  async updateWord(
    id: number,
    updates: Partial<Omit<Word, "id">>,
  ): Promise<WordResponse> {
    const { data, error } = await supabase
      .from("words")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    return { word: data, error };
  },

  async deleteWord(id: number): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase.from("words").delete().eq("id", id);

    return { error };
  },
};
