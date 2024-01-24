// CalendarCard.tsx
import React from "react";
import { VStack, Text, Button, Grid, GridItem, Box } from "@chakra-ui/react";

interface CalendarCardProps {
  month: Date;
  selectedDates: Date[];
  onSelectDate: (date: Date) => void;
}

const CalendarCard: React.FC<CalendarCardProps> = ({ month, selectedDates, onSelectDate }) => {
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const monthDays = Array.from({ length: daysInMonth + firstDayOfMonth }, (_, i) =>
    i < firstDayOfMonth
      ? null // Placeholder for days before the first day of the month
      : new Date(month.getFullYear(), month.getMonth(), i - firstDayOfMonth + 1)
  );

  const isDateInRange = (date: Date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

  if (selectedDates.length === 2) {
      return date >= selectedDates[0] && date <= selectedDates[1];
    }

    return false;
  };

  return (
    <Box boxShadow="md" p={2} borderRadius="md" maxW="sm" display={"flex"} flexShrink={"0"}>
      <VStack spacing={1} align="center">
        <Text fontSize="md" fontWeight="bold">
          {month.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
        </Text>
        <Grid templateColumns="repeat(7, 1fr)" gap={1}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <GridItem key={day} colSpan={1} textAlign="center">
              <Text fontWeight="bold" fontSize="xs">
                {day}
              </Text>
            </GridItem>
          ))}
          {monthDays.map((day, index) => (
            <GridItem key={index} colSpan={1} textAlign="center">
              {day ? (
                <Button
                  onClick={() => onSelectDate(day)}
                  bg={isDateInRange(day) ? "#F7CF47" : undefined}
                  color={isDateInRange(day) ? "white" : undefined}
                  _hover={isDateInRange(day) ? { bg: "#F7CF30" } : undefined}
                  w="100%"
                  fontSize="sm"
                  isDisabled={day < new Date()}
                >
                  {day.getDate()}
                </Button>
              ) : (
                <Text color="transparent">{" "}</Text>
              )}
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default CalendarCard;
