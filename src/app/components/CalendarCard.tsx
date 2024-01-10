import React from "react";
import { Container, Text, VStack, HStack, Grid, GridItem } from "@chakra-ui/react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, getDay } from "date-fns";

const CalendarCard: React.FC<{ month: Date }> = ({ month }) => {
  // Calculate the first day of the month
  const startOfMonthDate = startOfMonth(month);
  const endOfMonthDate = endOfMonth(month);

  // Generate an array of dates for the entire month
  const monthDates = eachDayOfInterval({
    start: startOfMonthDate,
    end: endOfMonthDate,
  });

  // Get the day of the week for the 1st day of the month
  const firstDayOfWeek = getDay(startOfMonthDate);

  return (
    <Container
      bg="white"
      borderRadius="md"
      p={4}
      boxShadow="md"
      minW="300px"
      textAlign="center"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        {format(month, "MMMM yyyy")}
      </Text>
      <VStack spacing={2}>
        <Grid templateColumns="repeat(7, 1fr)" gap={2}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <GridItem key={day} colSpan={1} textAlign="center" fontSize="sm" fontWeight="bold">
              {day}
            </GridItem>
          ))}
          {Array.from({ length: firstDayOfWeek }, (_, index) => (
            <GridItem
              key={`empty-${index}`}
              colSpan={1}
              textAlign="center"
              fontSize="sm"
              color="gray.400"
            >
              {/* Empty grid cells before the 1st day of the month */}
            </GridItem>
          ))}
          {monthDates.map((date) => (
            <GridItem
              key={date.toString()}
              colSpan={1}
              textAlign="center"
              fontSize="sm"
              color="black"
            >
              {format(date, "d")}
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Container>
  );
};

export default CalendarCard;
