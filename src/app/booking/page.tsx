"use client";

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
} from "@chakra-ui/react";
import CalendarContainer from "../components/CalendarContainer"; // Adjust the path as needed

const Booking: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

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
    // Add or remove the selected date based on whether it's already in the array
    setSelectedDates((prevDates) =>
      prevDates.some((d) => d.getTime() === date.getTime())
        ? prevDates.filter((d) => d.getTime() !== date.getTime())
        : [...prevDates, date]
    );
  };

  return (
    <VStack spacing={6} align="center">
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
      <Center>
        <VStack spacing={6}>
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
      </Center>
      <Container marginTop={6} mx="auto">
        <Container
          maxW={{ base: "90%", md: "container.sm" }}
          p={4}
          bgColor="gray.100"
          borderRadius="md"
        >
          <Text fontSize={{ base: "l", md: "2xl" }}>
            Selected Dates: {selectedDates.map((date) => date.toDateString()).join(", ")}
          </Text>
        </Container>
        <CalendarContainer selectedDates={selectedDates} onSelectDate={handleSelectDate} />
      </Container>
    </VStack>
  );
};

const BookingButton: React.FC<{ label: string }> = ({ label }) => {
  return (
    <Button borderRadius={33} background="#F7CF47" width={{ base: "100%", md: "auto" }}>
      <Text fontSize={{ base: "xl", md: "2xl" }} fontStyle="normal">
        {label}
      </Text>
    </Button>
  );
};

export default Booking;
