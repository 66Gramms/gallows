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

  async getRandomWord(difficulty?: number): Promise<WordResponse> {
    let query = supabase.from("words").select("*");

    if (difficulty !== undefined) {
      query = query.eq("difficulty", difficulty);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      return { word: null, error };
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    return { word: data[randomIndex], error: null };
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
