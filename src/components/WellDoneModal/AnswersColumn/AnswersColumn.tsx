import type { AnswerResponse } from "../../../redux/tasks/type";
import { getTaskWord } from "../../utils/getTaskWord";
import css from "./AnswersColumn.module.css";

type AnswersColumnProps = {
  nameColumn: string;
  answers: AnswerResponse[];
};

export default function AnswersColumn({
  nameColumn,
  answers,
}: AnswersColumnProps) {
  return (
    <div className={css.column}>
      <p className={css.titleColumn} >{nameColumn}</p>
      <ul className={css.answerList}>
        {answers.map((a) => (
          <li className={css.answerItem} key={a._id}>
            {getTaskWord(a)}
          </li>
        ))}
      </ul>
    </div>
  );
}
