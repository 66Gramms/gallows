import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameStatus, MAX_MISTAKES } from "@/constants/general";

interface GameState {
  difficulty: number | null;
  word: string | null;
  guessedLetters: string[];
  mistakes: number;
  gameStatus: GameStatus;
}

const initialState: GameState = {
  difficulty: null,
  word: null,
  guessedLetters: [],
  mistakes: 0,
  gameStatus: GameStatus.PLAYING,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initializeGame: (
      state,
      action: PayloadAction<{ difficulty: number; word: string }>,
    ) => {
      if (
        state.word !== action.payload.word ||
        state.difficulty !== action.payload.difficulty
      ) {
        state.difficulty = action.payload.difficulty;
        state.word = action.payload.word;
        state.guessedLetters = [];
        state.mistakes = 0;
        state.gameStatus = GameStatus.PLAYING;
      }
    },
    guessLetter: (state, action: PayloadAction<string>) => {
      const letter = action.payload;

      if (
        state.gameStatus !== GameStatus.PLAYING ||
        !state.word ||
        state.guessedLetters.includes(letter)
      ) {
        return;
      }

      state.guessedLetters.push(letter);

      const isCorrect = state.word.toUpperCase().includes(letter);

      if (!isCorrect) {
        state.mistakes += 1;
      }

      // Check for loss
      if (state.mistakes >= MAX_MISTAKES) {
        state.gameStatus = GameStatus.LOST;
        return;
      }

      // Check for win
      const wordLetters = state.word.toUpperCase().split("");
      const allLettersGuessed = wordLetters.every((l) =>
        state.guessedLetters.includes(l),
      );

      if (allLettersGuessed) {
        state.gameStatus = GameStatus.WON;
      }
    },
    resetGame: (state) => {
      state.word = null;
      state.difficulty = null;
      state.guessedLetters = [];
      state.mistakes = 0;
      state.gameStatus = GameStatus.PLAYING;
    },
  },
});

export const { initializeGame, guessLetter, resetGame } = gameSlice.actions;

export default gameSlice.reducer;
