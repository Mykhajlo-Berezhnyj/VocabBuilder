import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { fetchTasks } from "../../redux/tasks/operations";
import TrainingRoom from "../../components/TrainingRoom/TrainingRoom";
import css from "./TrainingPage.module.css";
import { selectCurrentIndex, selectTasks } from "../../redux/tasks/selector";
import NotWordReport from "../../components/NotWordReport/NotWordReport";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

export default function TrainingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(selectTasks);
  const current = useSelector(selectCurrentIndex);
  const progress = Math.round((current / tasks.length) * 100);



  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <main className={css.main}>
      {tasks.length === 0 ? (
        <NotWordReport />
      ) : (
        <>
          <ProgressBar progress={progress}  className={css.sectionProgress} />
          <TrainingRoom className={css.sectionTrainingRoom} />
        </>
      )}
    </main>
  );
}
