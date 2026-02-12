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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getErrorMessage } from "../utils/getErrorMessage";
import type { AnswerResponse } from "../../redux/tasks/type";
import { selectWords } from "../../redux/userDictionary/selectors";

type UseCurrentAnswerProps = {
  reset: () => void;
  //   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useCurrentAnswer({ reset }: UseCurrentAnswerProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState<AnswerResponse[]>([]);
  const tasks = useSelector(selectTasks);
  const currentIndex = useSelector(selectCurrentIndex);
  const answers = useSelector(selectAnswers);
  const navigate = useNavigate();
  const words = useSelector(selectWords);

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
  const word = words.find((w) => w._id === task._id);
  const isLastTask = !!task && currentIndex === tasks.length - 1;
  const fieldName = task.task;

  const handleAnswer = async (data: FormData) => {
    if (!task) return;
    const value = data[fieldName]?.trim();
    let answer;
    if (value) {
      answer = buildAnswer({ word, task, value });
      if (!isLastTask) {
        dispatch(createAnswers(answer));
        dispatch(nextIndex());
        reset();
        return;
      }
    } else if (!value) {
      if (!isLastTask) {
        dispatch(nextIndex());
        reset();
        return;
      }
    }
    const payload = value ? [...answers, answer] : answers;
    if (payload.length === 0) {
      toast.error("Please provide at least one answer before saving.");
      return;
    }
    try {
      setIsSaving(true);
      const res = await axios.post("words/answers", payload);
      setResult(res.data);
      setIsOpen(true);
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
      navigate("/dictionary");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    handleAnswer,
    isLastTask,
    tasks,
    task,
    result,
    isOpen,
    isSaving,
    closeModal: () => {
      setIsOpen(false);
      navigate("/dictionary");
    },
  };
}
