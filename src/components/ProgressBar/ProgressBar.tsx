import CircularProgress from "@mui/material/CircularProgress";
import Container from "../Container/Container";
import css from "./ProgressBar.module.css";

type ProgressBarProps = {
  className: string;
  progress: number;
};

export default function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <section className={className}>
      <Container className={css.progressContainer}>
        <div className ={css.circularWrap} >
            <CircularProgress
              className={css.circular}
              enableTrackSlot
              variant="determinate"
              size={"var(--size)"}
              sx={{
                color: "var(--color-primary)",
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
                "& .MuiCircularProgress-circleTrack": {
                  color: "var(--color-not-progress)",
                },
              }}
              thickness={window.innerWidth >= 768 ? 4.5 : 3.5}
              value={progress}
            />
            <span className={css.progress} >{progress}</span>
        </div>
      </Container>
    </section>
  );
}
