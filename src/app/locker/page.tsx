"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  HStack,
  Heading,
  Text,
  VStack,
  IconButton,
  Button,
  Divider,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import CircularButton from "../components/CircularButton";
import { GrayBall, YellowBall } from "../components/Logo";
import { useSearchParams } from "next/navigation";
import { useBreakpointValue } from "@chakra-ui/react";

const Locker = () => {
  const searchParams = useSearchParams();
  const selectedZone = searchParams.get("selectedZone");

  const totalRowsDesktop = 6;
  const totalColsDesktop = 12;
  const totalRowsMobile = 6;
  const totalColsMobile = 6;

  // Generate labelsArray
  const labelsArray: string[] = [];
  for (let i = 1; i <= 1001; i++) {
    const label = `A${i.toString().padStart(3, "0")}`;
    labelsArray.push(label);
  }

  // Calculate total rows and columns based on breakpoint
  const totalRows =
    useBreakpointValue({ base: totalRowsMobile, md: totalRowsDesktop }) || 0;
  const totalCols =
    useBreakpointValue({ base: totalColsMobile, md: totalColsDesktop }) || 0;

  // State for tracking the current position
  const [currentPosition, setCurrentPosition] = useState(0);

  const renderCircularButtons = (): JSX.Element[] => {
    const buttons: JSX.Element[] = [];
    let index = currentPosition;

    for (let row = 0; row < totalRows; row++) {
      const rowButtons: JSX.Element[] = [];
      for (let col = 0; col < totalCols; col++) {
        const label = labelsArray[index];
        if (label) {
          const isDisabled = false; // You can set your logic for disabled buttons here
          rowButtons.push(
            <CircularButton
              key={`${row}-${col}`}
              label={label}
              isDisabled={isDisabled}
            />
          );
        }
        index++;
      }
      buttons.push(
        <HStack key={row} spacing={2}>
          {rowButtons}
        </HStack>
      );
    }

    return buttons;
  };

  // Function to handle the "Next" button click
  const handleNextClick = () => {
    const maxPosition = labelsArray.length - totalRows * totalCols;
    const nextPosition = Math.min(
      currentPosition + totalRows * totalCols,
      maxPosition
    );
    setCurrentPosition(nextPosition);
  };

  // Function to handle the "Previous" button click
  const handlePreviousClick = () => {
    const prevPosition = Math.max(currentPosition - totalRows * totalCols, 0);
    setCurrentPosition(prevPosition);
  };

  return (
    <HStack spacing={4} display={"flex"} flexWrap={"wrap"} marginLeft={"5%"}>
      <VStack marginTop={10} alignItems={"start"}>
        <Container
          display={"flex"}
          alignItems={"center"}
          alignContent={"center"}
          justifyItems={"center"}
          flex={"wrap"}
          maxW={625}
          minW={"full"}
          flexDirection={"column"}
        >
          <Container marginLeft={"5%"}>
            <Text textAlign={"left"}>booking</Text>
            <Heading>ZONE {selectedZone}</Heading>
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
          </Container>

          {/* Circular buttons with Next and Previous buttons */}
          <HStack spacing={2} display={"flex"} marginTop={4} maxW={625}>
            {currentPosition > 0 && (
              <IconButton
                borderRadius={"full"}
                aria-label="Previous"
                icon={<ChevronLeftIcon />}
                onClick={handlePreviousClick}
                transform="translateY(-50%)"
                background={"blackAlpha.800"}
                color={"white"}
              />
            )}
            {currentPosition == 0 && <Box marginRight={10}></Box>}
            <HStack display={"flex"} flexWrap={"wrap"}>
              {/* "Previous" button */}
              {/* Circular buttons */}
              {renderCircularButtons()}
              {/* "Next" button */}
            </HStack>
            {currentPosition < labelsArray.length - totalRows * totalCols && (
              <IconButton
                aria-label="Next"
                background={"blackAlpha.800"}
                color={"white"}
                borderRadius={"full"}
                icon={<ChevronRightIcon />}
                onClick={handleNextClick}
                transform="translateY(-50%)"
              />
            )}
          </HStack>
          <Button
            background={"blackAlpha.800"}
            width={{ base: 240, md: 348 }}
            alignItems={"center"}
            color={"white"}
            marginTop={5}
            borderRadius={17}
          >
            จอง
          </Button>
        </Container>
      </VStack>
      <VStack spacing={2} marginLeft={"5%"} marginTop={"5%"}>
        <Box
          display={"flex"}
          borderRadius={33}
          marginLeft={"5%"}
          border={"0.5px solid"}
          width={332}
          alignItems={"flex-start"}
          gap={"10px"}
          padding={"0px 24px 12px 20px"}
          flexDirection={"column"}
        >
          <Box
            display={"flex"}
            width={224}
            height={51}
            alignItems={"flex-end"}
            gap={"10px"}
          >
            <Text fontSize={30}>ZONE {selectedZone}</Text>
            <Text fontSize={14}>MHMK ชั้น 2</Text>
          </Box>
          <Divider height={"1px"} width={"290px"} />
          <Text fontSize={14}>Locker number : A000</Text>
          <Text fontSize={14}>สถานะการจอง : pending</Text>
        </Box>
        <Box
          display={"flex"}
          borderRadius={33}
          marginLeft={"5%"}
          border={"0.5px solid"}
          width={332}
          alignItems={"center"}
          gap={"15px"}
          padding={"012px 47px"}
          flexDirection={"column"}
        >
          <Box
            display={"flex"}
            padding={"0px 10px"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"8px"}
          >
            <Text fontSize={20}>Remaining time</Text>
            <Divider
              width={157}
              height={0}
              borderColor="black"
              borderWidth="1px"
            />
            <Text fontSize={12}>DAY</Text>
            <Box
              display={"flex"}
              padding={"10px"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"10px"}
              background={"yellow.300"}
              borderRadius={5}
              border={"0.2px solid"}
            >
              <Text fontSize={35}>00</Text>
            </Box>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"2px"}
            borderRadius={10}
            border={"1px solid"}
            padding={"10px"}
          >
            <Text>3 APRIL 2022 - 5 APRIL 2022</Text>
          </Box>
        </Box>
        <Button
          background={"blackAlpha.800"}
          width={{ base: 240, md: 348 }}
          alignItems={"center"}
          color={"white"}
          isDisabled={true}
          borderRadius={17}
          marginTop={4}
        >
          ยกเลิกการจอง
        </Button>
      </VStack>
    </HStack>
  );
};

export default Locker;
