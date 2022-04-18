import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { PageContainer } from "../../components";
import { HomeHeader } from "./home-header";
import { Calendar } from "./calendar";
import { HabitsList } from "./habits-list";

export function HomePage() {
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());

  function handleDayClick(dayjs: Dayjs) {
    setSelectedDay(dayjs);
  }

  return (
    <PageContainer>
      <HomeHeader selectedDay={selectedDay} />
      <Calendar onClick={handleDayClick} />
      <HabitsList />
    </PageContainer>
  );
}
