import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WordDifficulty } from "@/constants/general";
import Input from "../input";
import Button from "../button";
import { createWordSchema, type WordFormData } from "@/components/organisms/word-column/schema";

interface AddWordFormProps {
  difficulty: WordDifficulty;
  onSubmit: (word: string) => void;
  isPending: boolean;
  error?: boolean;
}

export default function AddWordForm({
  difficulty,
  onSubmit,
  isPending,
  error,
}: AddWordFormProps) {
  const form = useForm<WordFormData>({
    resolver: zodResolver(createWordSchema(difficulty)),
    defaultValues: {
      word: "",
    },
  });

  const handleSubmit = (data: WordFormData) => {
    onSubmit(data.word);
    form.reset();
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-3">
        <Input
          type="text"
          placeholder="Add new word..."
          error={form.formState.errors.word?.message}
          className="flex-1"
          {...form.register("word")}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="px-6 whitespace-nowrap text-base"
        >
          {isPending ? "Adding..." : "Add Word"}
        </Button>
      </form>

      {error && (
        <p className="text-red-500 dark:text-red-400 text-sm mt-2">
          Error adding word. Please try again.
        </p>
      )}
    </div>
  );
}
