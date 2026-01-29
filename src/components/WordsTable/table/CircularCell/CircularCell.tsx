import CircularProgress from "@mui/material/CircularProgress";
import css from "./CircularCell.module.css"


type CircularCellProps = {
  value: number;
  isMobile: boolean;
};

export function CircularCell({ value, isMobile }: CircularCellProps) {
  return (
    <span className={css.progressWrap}>
      {!isMobile && `${value}%`}
      <CircularProgress
        enableTrackSlot
        variant="determinate"
        color="secondary"
        size={"var(--circularSize)"}
        thickness={7}
        value={value}
        className={css.circularProgress}
        sx={{
          color: "var(--color-progress)",
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
          "& .MuiCircularProgress-circleTrack": {
            color: "var(--color-not-progress)",
          },
        }}
      />
    </span>
  );
}
