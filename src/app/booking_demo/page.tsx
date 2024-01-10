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

const formatDate = (date: Date): string => {
  // Simple date formatting for demonstration purposes
  return date.toISOString().split("T")[0];
};

const Booking: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);

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
      <Divider
        height={120}
        size="10px"
        borderColor="black"
        borderWidth="1px"
      />
      <Container marginTop={6} mx="auto">
        <Container
          maxW={{ base: "90%", md: "container.sm" }}
          p={4}
          bgColor="gray.100"
          borderRadius="md"
        >
          <Text fontSize={{ base: "xl", md: "2xl" }}>Hello</Text>
        </Container>
        <HStack
          overflowX="auto"
          spacing={4}
          py={4}
          px={2}
          mt={4}
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {selectedDates.map((date, index) => (
            <DateCard key={index} date={date} />
          ))}
        </HStack>
      </Container>
    </VStack>
  );
};

const DateCard: React.FC<{ date: Date }> = ({ date }) => {
  return (
    <Container
      bg="white"
      borderRadius="md"
      p={4}
      boxShadow="md"
      minW="120px"
      textAlign="center"
    >
      <Text fontSize="md">{formatDate(date)}</Text>
    </Container>
  );
};

const BookingButton: React.FC<{ label: string }> = ({ label }) => {
  return (
    <Button
      borderRadius={33}
      background="#F7CF47"
      width={{ base: "100%", md: "auto" }}
    >
      <Text fontSize={{ base: "xl", md: "2xl" }} fontStyle="normal">
        {label}
      </Text>
    </Button>
  );
};

export default Booking;
