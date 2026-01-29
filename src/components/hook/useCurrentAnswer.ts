import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { createAnswers, nextIndex } from "../../redux/tasks/slice";
import { buildAnswer } from "../utils/buildAnswer";
import { type FormData } from "../utils/getAnswerValue";
import {
  selectAnswers,
  selectCurrentIndex,
  selectTasks,
} from "../../redux/tasks/selector";
import toast from "react-hot-toast";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type UseCurrentAnswerProps = {
  reset: () => void;
  //   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useCurrentAnswer({ reset }: UseCurrentAnswerProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState(null);
  const tasks = useSelector(selectTasks);
  const currentIndex = useSelector(selectCurrentIndex);
  const answers = useSelector(selectAnswers);
  const navigate = useNavigate();

  if (!tasks || tasks?.length === 0) {
    return {
      handleAnswer: () => {},
      task: null,
      isLastTask: false,
      result: null,
      isOpen: false,
      closeModal: () => {},
    };
  }
  const task = tasks?.[currentIndex];
  const isLastTask = !!task && currentIndex === tasks.length - 1;
  const fieldName = task.task;

  const handleAnswer = async (data: FormData) => {
    if (!task) return;
    const value = data[fieldName]?.trim();
    if (!value) {
      if (!isLastTask) {
        dispatch(nextIndex());
        reset();
      }
      return;
    }
    const answer = buildAnswer({ task, value });

    if (!isLastTask) {
      dispatch(createAnswers(answer));
      dispatch(nextIndex());
      reset();
      return;
    }

    try {
      const res = await axios.post("words/answers", [...answers, answer]);
      setResult(res.data);
      setIsOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error");
      }
      navigate("/dictionary");
    }
  };

  return {
    handleAnswer,
    isLastTask,
    tasks,
    task,
    result,
    isOpen,
    closeModal: () => {
      setIsOpen(false);
      navigate("/dictionary");
    },
  };
}
