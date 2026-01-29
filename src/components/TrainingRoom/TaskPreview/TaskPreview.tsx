import type { Task } from "../../../redux/tasks/type";
import LanguageLabel from "../../LanguageLabel/LanguageLabel";
import css from "./TaskPreview.module.css";

type TaskPreviewProps = {
  className: string;
  task: Task;
};

export default function TaskPreview({ className, task }: TaskPreviewProps) {
  const fieldName = task.task;

  return (
    <div className={className}>
      <p>{fieldName === "en" ? task.ua : task.en}</p>
      <LanguageLabel
        fieldName={fieldName === "en" ? "ua" : "en"}
        className={css.langLabel}
      />
    </div>
  );
}
