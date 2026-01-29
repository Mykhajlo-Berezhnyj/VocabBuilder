import clsx from "clsx";
import type { AnswerResponse } from "../../redux/tasks/type";
import AnswersColumn from "./AnswersColumn/AnswersColumn";
import css from "./WellDoneModal.module.css";

type WellDoneModalProps = {
  answers: AnswerResponse[];
  className?: string;
};

export default function WellDoneModal({ answers, className }: WellDoneModalProps) {
  const correctAnswers = answers.filter((a) => a.isDone);
  const mistakes = answers.filter((a) => !a.isDone);

  return (
    <section className={clsx(css.sectionWellDone, className)}>
      <h2 className={css.title}>Well done</h2>
      <div className={css.columnWrap}>
        <AnswersColumn nameColumn="Correct answers:" answers={correctAnswers} />
        <AnswersColumn nameColumn="Mistakes:" answers={mistakes} />
      </div>
    </section>
  );
}
