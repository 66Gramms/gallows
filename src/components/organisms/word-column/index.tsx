import { WordDifficulty } from "@/constants/general";
import {
  useWordsByDifficulty,
  useCreateWord,
  useUpdateWord,
  useDeleteWord,
} from "@/hooks/use-words";
import { getDifficultyName, getWordLengthRequirements } from "@/constants/difficulty";
import DifficultyHeader from "@/components/molecules/difficulty-header";
import AddWordForm from "@/components/molecules/add-word-form";
import WordsList from "@/components/molecules/words-list";

interface WordColumnProps {
  difficulty: WordDifficulty;
}

export default function WordColumn({ difficulty }: WordColumnProps) {
  const { data: words = [], isLoading } = useWordsByDifficulty(difficulty);
  const createWord = useCreateWord();
  const updateWord = useUpdateWord();
  const deleteWord = useDeleteWord();

  const handleAddWord = (word: string) => {
    createWord.mutate({ word, difficulty });
  };

  const handleUpdateWord = (id: number, word: string) => {
    updateWord.mutate({ id, updates: { word } });
  };

  const handleDeleteWord = (id: number) => {
    deleteWord.mutate({ id, difficulty });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="sticky top-0 bg-zinc-50 dark:bg-black pb-6 border-b-2 border-amber-300 dark:border-amber-700/30 z-10">
        <DifficultyHeader
          difficultyName={getDifficultyName(difficulty)}
          lengthRequirements={getWordLengthRequirements(difficulty)}
        />
        <AddWordForm
          difficulty={difficulty}
          onSubmit={handleAddWord}
          isPending={createWord.isPending}
          error={createWord.isError}
        />
      </div>

      <div className="flex flex-col gap-3">
        <WordsList
          words={words}
          isLoading={isLoading}
          onUpdate={handleUpdateWord}
          onDelete={handleDeleteWord}
          isUpdating={updateWord.isPending}
          isDeleting={deleteWord.isPending}
        />
      </div>
    </div>
  );
}
