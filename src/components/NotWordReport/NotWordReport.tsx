import Container from "../Container/Container";
import Icon from "../Icon/Icon";
import css from "./NotWordReport.module.css";
import notWordReport from "../image/notWordReport.svg";
import ActionBlock from "../ActionBlock/ActionBlock";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../redux/modal/slice";

export default function NotWordReport() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dictionary");
    dispatch(openModal({ type: "addWord" }));
  };

  return (
    <section className={css.sectionNotWord}>
      <Container className={css.notWordContainer}>
        <Icon src={notWordReport} className={css.img} />
        <div className={css.notWordWrap}>
          <header className={css.header}>
            <h2 className={css.headerTitle}>
              You don't have a single word to learn right now.
            </h2>
            <p className={css.headerText}>
              Please create or add a word to start the workout. We want to
              improve your vocabulary and develop your knowledge, so please
              share the words you are interested in adding to your study.
            </p>
          </header>
          <ActionBlock
            className={css.actionBlock}
            classNameBtn={css.btnSabmit}
            classNameLink={css.lnkAction}
            btnOnClick={handleClick}
            btnName="Add word"
            linkText="Cancel"
            linkHref="/dictionary"
          />
        </div>
      </Container>
    </section>
  );
}
