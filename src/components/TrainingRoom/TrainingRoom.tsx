import InputField from "../InputField/InputField";
import { useForm } from "react-hook-form";
import Container from "../Container/Container";
import NextTaskBtn from "../Button/NextTaskBtn/NextTaskBtn";
import css from "./TrainingRoom.module.css";
import { useCurrentAnswer } from "../hook/useCurrentAnswer";
import TaskPreview from "./TaskPreview/TaskPreview";
import LanguageLabel from "../LanguageLabel/LanguageLabel";
import ActionBlock from "../ActionBlock/ActionBlock";
import Modal from "../Modal/Modal";
import WellDoneModal from "../WellDoneModal/WellDoneModal";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/tasks/selector";

type TrainingRoomProps = {
  className: string;
};

export default function TrainingRoom({ className }: TrainingRoomProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const { handleAnswer, isLastTask, tasks, task, result, isOpen, closeModal } =
    useCurrentAnswer({ reset });
  const isLoading = useSelector(selectIsLoading);

  if (!tasks) return <p>Not tasks</p>;

  if (!task) return <p>Not task</p>;

  const handleNext = () => {
    handleSubmit(handleAnswer)();
  };

  const onSubmit = () => {
    handleSubmit(handleAnswer)();
  };

  const fieldName = task.task;

  return (
    <section className={className}>
      <Container>
        <form className={css.trainingForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.formWrap}>
            <div className={css.answerForm}>
              <InputField
                className={css.area}
                as="textarea"
                placeholder="Введіть переклад"
                name={fieldName}
                register={register}
                error={errors[fieldName]?.message}
                rules={
                  fieldName === "en"
                    ? {
                        pattern: {
                          value: /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/,
                          message: "Invald english word",
                        },
                      }
                    : {
                        pattern: {
                          value: /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
                          message: "Invalid ukrainian word",
                        },
                      }
                }
              />
              <LanguageLabel fieldName={fieldName} className={css.langLabel} />
              {!isLastTask && (
                <NextTaskBtn className={css.btnNext} handleClick={handleNext} />
              )}
            </div>
            <TaskPreview className={css.taskPrev} task={task} />
          </div>
          <ActionBlock
            className={css.actionsBlock}
            classNameBtn={css.btnSabmit}
            classNameLink={css.lnkAction}
            btnName="Save"
            disabled={!isLastTask || isLoading}
            type="submit"
            linkText="Cancel"
            linkHref="/dictionary"
          />
        </form>
      </Container>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <WellDoneModal answers={result} className={css.wellDoneModal} />{" "}
        </Modal>
      )}
    </section>
  );
}
