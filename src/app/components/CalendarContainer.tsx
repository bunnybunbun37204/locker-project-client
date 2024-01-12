// CalendarContainer.tsx
import React, { useState, useEffect } from "react";
import { HStack, IconButton, VStack, useBreakpointValue } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CalendarCard from "./CalendarCard";

interface CalendarContainerProps {
  selectedDates: Date[];
  onSelectDate: (date: Date) => void;
}

const CalendarContainer: React.FC<CalendarContainerProps> = ({ selectedDates, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    setCurrentMonth(new Date());
  }, [isMobile]);

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) =>
      new Date(prevMonth.getFullYear(), prevMonth.getMonth() + (isMobile ? 1 : 3), 1)
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) =>
      new Date(prevMonth.getFullYear(), prevMonth.getMonth() - (isMobile ? 1 : 3), 1)
    );
  };

  return (
    <>
      <HStack justifyContent="center" mb={4} display={"flex"} minW={"80%"} alignItems={"center"} alignContent={"center"} flexWrap={"wrap"}>
        <IconButton icon={<FaChevronLeft />} aria-label="Previous Months" onClick={handlePrevMonth} />
        {isMobile ? (
          <CalendarCard month={currentMonth} selectedDates={selectedDates} onSelectDate={onSelectDate} />
        ) : (
          <HStack spacing={4}>
            {[0, 1, 2].map((offset) => (
              <CalendarCard
                key={offset}
                month={new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1)}
                selectedDates={selectedDates}
                onSelectDate={onSelectDate}
              />
            ))}
          </HStack>
        )}
        <IconButton icon={<FaChevronRight />} aria-label="Next Months" onClick={handleNextMonth} />
      </HStack>
    </>
  );
};

export default CalendarContainer;
