import type { Task } from "../../redux/tasks/type";

export type FormData = {
  en?: string;
  ua?: string;
};

type getAnswerValueProps = {
  task: Task;
  data: FormData;
};

export function getAnswerValue({ task, data }: getAnswerValueProps) {
  const fieldName = task.task;
  return data[fieldName]?.trim();
}
