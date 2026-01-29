import type { AnswerResponse } from "../../redux/tasks/type";

export function getTaskWord(answer: AnswerResponse) {
  const fieldName = answer.task;
  return answer[fieldName];
}
