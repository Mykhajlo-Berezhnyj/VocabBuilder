import type { Answer, Task } from "../../redux/tasks/type";
import type { UserWordResponse } from "../../redux/userDictionary/types";

type BuildAnswerProps = {
  word: UserWordResponse | undefined;
  task: Task;
  value: string;
};

export function buildAnswer({ word, task, value }: BuildAnswerProps): Answer {
  const normalize = (str: string) => str.trim().toLocaleLowerCase();

  if (task.task === "en") {
    return {
      _id: word ? word._id : task._id,
      ua: word ? word.ua : task.ua,
      en: word && normalize(value) === normalize(word.en) ? word.en : value,
      task: "en",
    };
  }
  return {
    _id: word ? word._id : task._id,
    en: word ? word.en : task.en,
    ua: word && normalize(value) === normalize(word.ua) ? word.ua : value,
    task: "ua",
  };
}
