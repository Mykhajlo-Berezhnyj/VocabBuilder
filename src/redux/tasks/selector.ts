import type { RootState } from "../store";

export const selectTasks = (state: RootState) => state.tasks.tasks;

export const selectCurrentIndex = (state: RootState) =>
  state.tasks.currentIndex;

export const selectAnswers = (state: RootState) => state.tasks.answers;

export const selectAnswerResponse = (state: RootState) =>
  state.tasks.answerResponse;

export const selectIsLoading = (state: RootState) => state.tasks.isLoading;

export const selectError = (state: RootState) => state.tasks.error;
