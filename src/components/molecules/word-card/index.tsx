import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Word } from "@/lib/words";
import Input from "../input";
import { createWordSchema, type WordFormData } from "@/components/organisms/word-column/schema";

interface WordCardProps {
  word: Word;
  onUpdate: (id: number, newWord: string) => void;
  onDelete: (id: number) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export default function WordCard({
  word,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: WordCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<WordFormData>({
    resolver: zodResolver(createWordSchema(word.difficulty)),
    defaultValues: {
      word: word.word,
    },
  });

  const handleSave = (data: WordFormData) => {
    if (data.word !== word.word) {
      onUpdate(word.id, data.word);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    form.reset({ word: word.word });
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded border-2 border-amber-300 dark:border-amber-700/30 bg-amber-50/50 dark:bg-amber-700/5 transition-colors">
      {isEditing ? (
        <form onSubmit={form.handleSubmit(handleSave)} className="flex items-center gap-2 flex-1">
          <Input
            type="text"
            error={form.formState.errors.word?.message}
            className="flex-1 text-base"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") handleCancel();
            }}
            {...form.register("word")}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isUpdating}
              className="px-3 py-1 text-sm rounded border-2 transition-colors bg-green-50 hover:bg-green-100 border-green-300 hover:border-green-400 dark:bg-green-700/10 dark:hover:bg-green-700/20 dark:border-green-700/30 dark:hover:border-green-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✓
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isUpdating}
              className="px-3 py-1 text-sm rounded border-2 transition-colors bg-gray-50 hover:bg-gray-100 border-gray-300 hover:border-gray-400 dark:bg-gray-700/10 dark:hover:bg-gray-700/20 dark:border-gray-700/30 dark:hover:border-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✕
            </button>
          </div>
        </form>
      ) : (
        <>
          <span className="flex-1 text-lg">{word.word}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              disabled={isDeleting}
              className="px-3 py-1 text-sm rounded border-2 transition-colors bg-blue-50 hover:bg-blue-100 border-blue-300 hover:border-blue-400 dark:bg-blue-700/10 dark:hover:bg-blue-700/20 dark:border-blue-700/30 dark:hover:border-blue-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(word.id)}
              disabled={isDeleting}
              className="px-3 py-1 text-sm rounded border-2 transition-colors bg-red-50 hover:bg-red-100 border-red-300 hover:border-red-400 dark:bg-red-700/10 dark:hover:bg-red-700/20 dark:border-red-700/30 dark:hover:border-red-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? "..." : "Delete"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
