import DashboardBtns from "./DashboardBtns/DashboardBtns";
import Filters from "./Filters/Filters";
import Statistic from "./Statistics/Statistics";
import css from "./Dashboard.module.css";
import Container from "../Container/Container";

type DashboardProps = {
  className: string;
};

export default function Dashboard({ className }: DashboardProps) {
  return (
    <section className={className}>
      <Container className={css.dashboardContainer}>
        <Filters className={css.filters} />
        <div className={css.dashboardWrap}>
          <Statistic className={css.statistic} />
          <DashboardBtns className={css.dashboardBtns} />
        </div>
      </Container>
    </section>
  );
}
