import dayjs from "dayjs";

type Props = {
  weekdays: number[];
};
export function WeekdayText({ weekdays }: Props) {
  function renderWeekday() {
    const everyDay = weekdays.length === 7;
    if (everyDay) {
      return "Everyday";
    }

    const everyWeekday =
      weekdays.length === 5 && weekdays.every((weekday) => weekday < 6);

    if (everyWeekday) {
      return "Weekdays";
    }

    return weekdays.map(
      (weekday) => `${dayjs().isoWeekday(weekday).format("ddd")} `
    );
  }

  return (
    <div className="text-xxs font-semibold text-purple-1 uppercase tracking-wider">
      {renderWeekday()}
    </div>
  );
}
