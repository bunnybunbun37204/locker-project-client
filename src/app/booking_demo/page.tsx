"use client"

import React, { useEffect, useState } from "react";
import {
  Container,
  VStack,
  HStack,
  Button,
  Text,
  Box,
  Image,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { ArrowForword, GrayBall, YellowBall } from "../components/Logo";
import CalendarContainer from "../components/CalendarContainer";
import ZoneCard from "../components/ZoneCard";
import { cookies } from "next/headers";
import { getCookie, getCookies } from "cookies-next";

const formatDate = (date: Date): string => {
  
  return date.toDateString();
};

const formatDates = (dates: Date[]): string => {
  
  let result = "";
  for (let i = 0; i < dates.length; i++) {
    result += dates[i].toDateString() + " - ";
  }
  return result.trim();
};


const Booking: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()]);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [visibleZoneIndex, setVisibleZoneIndex] = useState(0);

  useEffect(() => {
    const a = getCookies()
    const b = getCookie('id');
    setSelectedDates([new Date()]);
    console.log(a);
    console.log(b);
    
  }, [])
  

  const handleSelectDate = (date: Date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // If the clicked date is before the current date, do nothing
    if (date < currentDate) {
      return;
    }
    console.log(selectedDates[0]);

    // Update the selected dates based on the clicked date
    setSelectedDates((prevDates) => {
      if (prevDates.length === 1) {
        // If only one date is selected, select the new date
        return [prevDates[0], date];
      } else {
        // If two dates are already selected, reset to the new date
        return [date];
      }
    });
  };

  const handleSelectZone = (zone: string) => {
    setSelectedZone(zone);
  };

  const handleNextZone = () => {
    setVisibleZoneIndex((prevIndex) => (prevIndex + 1) % zones.length);
  };

  const handlePrevZone = () => {
    setVisibleZoneIndex((prevIndex) => (prevIndex - 1 + zones.length) % zones.length);
  };

  const zones = ["A", "B", "C"];

  return (
    <VStack spacing={4}>
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
      <HStack
        display={"flex"}
        alignItems={"flex-start"}
        alignContent={"flex-start"}
        flexWrap={"wrap"}
        spacing={4}
      >
        <Button
          display={"flex"}
          padding="2px 10px"
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={33}
          border="1px solid"
          background={"#F7CF47"}
        >
          <Text textAlign={"center"} fontSize={30} fontWeight={400}>
            DATE
          </Text>
        </Button>
        <Button
          display={"flex"}
          padding="2px 10px"
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={33}
          border="1px solid"
          background={"#F7CF47"}
        >
          <Text textAlign={"center"} fontSize={30} fontWeight={400}>
            ZONE
          </Text>
        </Button>
        <Button
          display={"flex"}
          padding="2px 10px"
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={33}
          border="1px solid"
          background={"#F7CF47"}
        >
          <Text textAlign={"center"} fontSize={30} fontWeight={400}>
            SITE&RULES
          </Text>
        </Button>
      </HStack>
      <Container
        display={"flex"}
        alignItems={"flex-start"}
        alignContent={"flex-start"}
        flex={"wrap"}
        minW={"90%"}
        flexDirection={"column"}
      >
        <Text textAlign={"left"}>booking</Text>
        <Heading>DATE</Heading>
      </Container>
      <Box
        display={"flex"}
        border={"1px solid"}
        borderRadius={10}
        alignContent={"center"}
        width={"70%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <HStack spacing={4}>
          {selectedDates.map((date, index) => (
            <React.Fragment key={index}>
              <Text fontSize={"14px"}>{formatDate(date)}</Text>
              {index < 1 && <ArrowForword width={15} />}
            </React.Fragment>
          ))}
        </HStack>
      </Box>
      <CalendarContainer
        selectedDates={selectedDates}
        onSelectDate={handleSelectDate}
      />
      <Container
        display={"flex"}
        alignItems={"flex-start"}
        alignContent={"flex-start"}
        flex={"wrap"}
        minW={"90%"}
        flexDirection={"column"}
      >
        <Text textAlign={"left"}>booking</Text>
        <Heading>ZONE</Heading>
        <HStack display={"flex"} flexWrap={"wrap"}>
          <Box
            display={"flex"}
            borderRadius={15}
            border={"1px solid"}
            maxW={171.745}
            width={"auto"}
            padding={"4px 6px"}
            height={23}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
            marginTop={2}
          >
            <GrayBall width={8.872} height={9} strokeWidth={0.2} />
            <Text>available</Text>
          </Box>
          <Box
            display={"flex"}
            borderRadius={15}
            border={"1px solid"}
            maxW={171.745}
            width={"auto"}
            padding={"4px 6px"}
            height={23}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
            marginTop={2}
          >
            <YellowBall width={8.872} height={9} strokeWidth={0.2} />
            <Text>unavailable</Text>
          </Box>
        </HStack>
        <HStack display={"flex"} flexWrap={"wrap"}>
          {zones.map((label, index) => (
            <ZoneCard date={formatDates(selectedDates)} key={index} label={label} zone={label}/>
          ))}
        </HStack>
      </Container>
      <HStack
        spacing={4}
        display={{ base: "flex", md: "none" }} // Show on mobile, hide on larger screens
      >
        <Button onClick={handlePrevZone} variant="ghost">
          <ArrowForword width={15} />
        </Button>
        <Button onClick={handleNextZone} variant="ghost">
          <ArrowForword width={15} />
        </Button>
      </HStack>
    </VStack>
  );
};

export default Booking;
