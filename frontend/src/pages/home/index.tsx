import { PageContainer } from "../../components";
import { HomeHeader } from "./home-header";
import { Calendar } from "./calendar";
import { HabitsList } from "./habits-list";
import { useHabitControllerFindAllByUserId } from "../../generated/api";

export function HomePage() {
  const habitsQuery = useHabitControllerFindAllByUserId();
  const habits = habitsQuery.data ? habitsQuery.data.data : [];

  return (
    <PageContainer>
      <HomeHeader />
      <Calendar />
      <HabitsList
        habits={habits}
        isLoading={habitsQuery.isLoading && !habitsQuery.isFetching}
      />
    </PageContainer>
  );
}
