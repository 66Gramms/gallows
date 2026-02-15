import { WordDifficulty } from "@/constants/general";
import WordColumn from "../word-column";

export default function WordManagementGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      <WordColumn difficulty={WordDifficulty.EASY} />
      <WordColumn difficulty={WordDifficulty.MEDIUM} />
      <WordColumn difficulty={WordDifficulty.HARD} />
    </div>
  );
}
