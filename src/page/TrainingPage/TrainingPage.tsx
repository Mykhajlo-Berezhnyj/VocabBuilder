import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { fetchTasks } from "../../redux/tasks/operations";
import TrainingRoom from "../../components/TrainingRoom/TrainingRoom";
import css from "./TrainingPage.module.css";
import { selectTasks } from "../../redux/tasks/selector";
import NotWordReport from "../../components/NotWordReport/NotWordReport";

export default function TrainingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <main className={css.main}>
      {tasks.length === 0 ? (
        <NotWordReport />
      ) : (
        <TrainingRoom className={css.sectionTrainingRoom} />
      )}
    </main>
  );
}
