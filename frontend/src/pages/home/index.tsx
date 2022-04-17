import { useState } from "react";
import { IoAdd, IoEllipsisVertical } from "react-icons/io5";
import dayjs, { Dayjs } from "dayjs";

import {
  PageContainer,
  PageHeader,
  Button,
  CalendarSlider,
} from "../../components";
import { Link } from "react-router-dom";

export function HomePage() {
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());

  function handleDayClick(dayjs: Dayjs) {
    setSelectedDay(dayjs);
  }

  function getDayTitle() {
    const today = dayjs();

    if (today.isSame(selectedDay, "day")) {
      return "Today";
    }

    if (selectedDay.isSame(today.subtract(1, "day"), "day")) {
      return "Yesterday";
    }

    if (selectedDay.isSame(today.add(1, "day"), "day")) {
      return "Tomorrow";
    }

    return selectedDay.format("dddd, DD");
  }

  return (
    <PageContainer>
      <PageHeader className="flex border-b border-b-gray-100">
        <div className="flex flex-row flex-1 justify-between items-center">
          <div>
            <h1 className="text-gray-900 text-xl font-bold">{getDayTitle()}</h1>
            <h4 className="text-gray-500 text-xs font-light">
              All habits completed
            </h4>
          </div>
          <div>
            <Link to="/add-habit">
              <Button className="bg-primary-600 text-white font-semibold">
                <IoAdd className="text-lg" />
              </Button>
            </Link>
            <Button className="bg-white">
              <IoEllipsisVertical className="text-lg text-gray-900" />
            </Button>
          </div>
        </div>
      </PageHeader>
      <CalendarSlider onClick={handleDayClick} />
    </PageContainer>
  );
}
