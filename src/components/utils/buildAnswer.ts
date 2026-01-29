import type { Answer, Task } from "../../redux/tasks/type";

type BuildAnswerProps = {
  task: Task;
  value: string;
};

export function buildAnswer({ task, value }: BuildAnswerProps): Answer {
  if (task.task === "en") {
    return {
      _id: task._id,
      ua: task.ua,
      en: value,
      task: "en",
    };
  }
  return {
    _id: task._id,
    en: task.en,
    ua: value,
    task: "ua",
  };
}
