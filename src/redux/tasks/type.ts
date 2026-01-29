interface TaskEn {
  _id: string;
  ua: string;
  task: "en";
}

interface TaskUa {
  _id: string;
  en: string;
  task: "ua";
}

export type Task = TaskEn | TaskUa;

export interface ApiTaskResponse {
  tasks: Task[];
}

export interface Answer {
  _id: string;
  en: string;
  ua: string;
  task: "en" | "ua";
}

export interface AnswerResponse {
  _id: string;
  ua: string;
  task: "en" | "ua";
  en: string;
  isDone: boolean;
}

export interface TasksState {
  tasks: Task[];
  currentIndex: number;
  answers: Answer[];
  answerResponse: AnswerResponse[];
  isLoading: boolean;
  error: string | null;
}
