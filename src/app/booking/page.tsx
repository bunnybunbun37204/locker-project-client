"use client";

// Import necessary Chakra UI components and any additional components or styles you might need
import React, { useEffect, useState } from "react";
import {
  Container,
  Image,
  Divider,
  HStack,
  Text,
  VStack,
  Button,
  Center,
  Heading,
} from "@chakra-ui/react";
import CalendarContainer from "../components/CalendarContainer"; // Adjust the path as needed
import { useRouter } from "next/navigation";

// Assuming you have a list of zones
const zones = ["Zone A", "Zone B", "Zone C", "Zone D"];

const Booking: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSelectDate = (date: Date) => {
    // Implement your logic for handling selected dates
    // This is just a placeholder
    setSelectedDates((prevDates) => [...prevDates, date]);
  };

  const handleSelectZone = (zone: string) => {
    // Implement your logic for handling selected zones
    // This is just a placeholder
    setSelectedZone(zone);
  };

  return (
    <VStack spacing={6}>
      <Image
        src="logo_sci.png"
        alt="Sci Logo"
        width="84px"
        height="76px"
        position="absolute"
        top="25px"
        right="48px"
      />
      <Divider height={120} size="10px" borderColor="black" borderWidth="1px" />
      <VStack spacing={6} alignItems={"flex-start"} alignContent={"flex-start"} flexWrap={"wrap"}>
        {isMobile ? (
          <>
            <VStack>
              <HStack spacing={6}>
                <BookingButton label="DATE" />
                <BookingButton label="ZONE" />
              </HStack>
              <BookingButton label="SITE&RULES" />
            </VStack>
          </>
        ) : (
          <HStack spacing={6}>
            <BookingButton label="DATE" />
            <BookingButton label="ZONE" />
            <BookingButton label="SITE&RULES" />
          </HStack>
        )}
      </VStack>
      <VStack spacing={3} alignItems={"flex-start"}>
        <Text>booking date</Text>
        <Heading>Date</Heading>
      </VStack>
      <Container
        maxW={{ base: "90%", md: "container.sm" }}
        p={4}
        bgColor="gray.100"
        borderRadius="md"
      >
        <Text>Select Date</Text>
        {/* Display selected dates */}
        <Text fontSize={{ base: "l", md: "2xl" }}>
          Selected Dates:{" "}
          {selectedDates.map((date) => date.toDateString()).join(" to ")}
        </Text>
      </Container>
      {/* Calendar container */}
      <CalendarContainer
        selectedDates={selectedDates}
        onSelectDate={handleSelectDate}
      />
      <Container
        maxW={{ base: "90%", md: "container.sm" }}
        p={4}
        bgColor="gray.100"
        borderRadius="md"
      >
        <Text>Select Zone</Text>
        {/* Display zones in a horizontal card layout */}
        <HStack spacing={4}>
          {zones.map((zone) => (
            <ZoneCard
              key={zone}
              zone={zone}
              isSelected={zone === selectedZone}
              onSelectZone={() => handleSelectZone(zone)}
            />
          ))}
          <Button
            colorScheme="facebook"
            onClick={() =>
              router.push(
                `/locker?selectedDate=${selectedDates.toString()}&selectedZone=${selectedZone}`
              )
            }
          >
            GOOO
          </Button>
        </HStack>
      </Container>
    </VStack>
  );
};

// BookingButton component
const BookingButton: React.FC<{ label: string }> = ({ label }) => {
  return (
    <Button
      borderRadius={33}
      background="#F7CF47"
      width={{ base: "auto", md: "auto" }}
    >
      <Text fontSize={{ base: "xl", md: "2xl" }} fontStyle="normal">
        {label}
      </Text>
    </Button>
  );
};

// ZoneCard component
const ZoneCard: React.FC<{
  zone: string;
  isSelected: boolean;
  onSelectZone: () => void;
}> = ({ zone, isSelected, onSelectZone }) => {
  return (
    <Button
      borderRadius={8}
      background={isSelected ? "blue.500" : undefined}
      color={isSelected ? "white" : undefined}
      _hover={{ bg: "blue.300" }}
      onClick={onSelectZone}
    >
      {zone}
    </Button>
  );
};

export default Booking;
