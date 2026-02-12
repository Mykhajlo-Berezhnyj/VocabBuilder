import clsx from "clsx";
import type { AnswerResponse } from "../../redux/tasks/type";
import AnswersColumn from "./AnswersColumn/AnswersColumn";
import css from "./WellDoneModal.module.css";
import Container from "../Container/Container";

type WellDoneModalProps = {
  answers: AnswerResponse[];
  className?: string;
};

export default function WellDoneModal({
  answers,
  className,
}: WellDoneModalProps) {
  const total = answers.length;
  const correctAnswers = answers.filter((a) => a.isDone);
  const mistakes = answers.filter((a) => !a.isDone);
  const correctPercent = Math.round((correctAnswers.length / total) * 100);
  const mistakesPercent = Math.round((mistakes.length / total) * 100);

  return (
    <section className={clsx(css.sectionWellDone, className)}>
      <Container className={css.containernWellDone}>
        <h2 className={css.title}>Well done</h2>
        {total === 0 ? (
          <p>Not answers</p>
        ) : (
          <div className={css.columnWrap}>
            <AnswersColumn
              nameColumn={`Correct answers (${correctPercent}%)`}
              answers={correctAnswers}
            />
            <AnswersColumn
              nameColumn={`Mistakes (${mistakesPercent}%)`}
              answers={mistakes}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
