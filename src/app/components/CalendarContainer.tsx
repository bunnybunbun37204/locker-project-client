import React, { useState, useEffect } from "react";
import { HStack, IconButton, VStack, useBreakpointValue } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CalendarCard from "./CalendarCard"; // Adjust the path as needed

const CalendarContainer: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    setCurrentMonth(new Date());
  }, [isMobile]);

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + (isMobile ? 1 : 3), 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - (isMobile ? 1 : 3), 1));
  };

  return (
    <>
      <HStack justifyContent="center" mb={4}>
        <IconButton
          icon={<FaChevronLeft />}
          aria-label="Previous Months"
          onClick={handlePrevMonth}
        />
        {isMobile ? (
          <CalendarCard key={0} month={currentMonth} />
        ) : (
          <HStack spacing={4}>
            {[0, 1, 2].map((offset) => (
              <CalendarCard key={offset} month={new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1)} />
            ))}
          </HStack>
        )}
        <IconButton
          icon={<FaChevronRight />}
          aria-label="Next Months"
          onClick={handleNextMonth}
        />
      </HStack>
    </>
  );
};

export default CalendarContainer;
