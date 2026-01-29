import { useSelector } from "react-redux";
import { selectTotalCount } from "../../../redux/userDictionary/selectors";
import css from "./Statistics.module.css";

type StatisticProps = {
  className: string;
};

export default function Statistic({ className }: StatisticProps) {
  const totalCount = useSelector(selectTotalCount);

  return (
    <dl className={className}>
      <dd className={css.txtStatistic}>To study:</dd>
      <dt className={css.dataStatistic}>{totalCount}</dt>
    </dl>
  );
}
