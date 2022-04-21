import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { PageContainer } from "../../components";
import { HomeHeader } from "./home-header";
import { Calendar } from "./calendar";
import { HabitsList } from "./habits-list";

export function HomePage() {
  return (
    <PageContainer>
      <HomeHeader />
      <Calendar />
      <HabitsList />
    </PageContainer>
  );
}
