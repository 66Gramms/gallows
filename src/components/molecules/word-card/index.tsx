import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Word } from "@/lib/words";
import Input from "../input";
import Button from "../button";
import {
  createWordSchema,
  type WordFormData,
} from "@/components/organisms/word-column/schema";

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
        <form
          onSubmit={form.handleSubmit(handleSave)}
          className="flex items-center gap-2 flex-1"
        >
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
          <div className="flex gap-1.5 justify-end w-full">
            <Button
              type="submit"
              disabled={isUpdating}
              variant="success"
              className="px-2! py-1! text-sm!"
            >
              ✓
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              disabled={isUpdating}
              variant="secondary"
              className="px-2! py-1! text-sm!"
            >
              ✕
            </Button>
          </div>
        </form>
      ) : (
        <>
          <span className="flex-1 text-lg">{word.word}</span>
          <div className="flex gap-1.5">
            <Button
              onClick={() => setIsEditing(true)}
              disabled={isDeleting}
              variant="primary"
              className="px-2! py-1! text-sm!"
            >
              Edit
            </Button>
            <Button
              onClick={() => onDelete(word.id)}
              disabled={isDeleting}
              variant="danger"
              className="px-2! py-1! text-sm!"
            >
              {isDeleting ? "..." : "Delete"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
