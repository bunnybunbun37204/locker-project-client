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
  for (let i = 1; i <= 109; i++) {
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
    <VStack marginLeft={"10%"} marginTop={10} alignItems={"start"}>
      <Container
        display={"flex"}
        alignItems={"flex-start"}
        alignContent={"flex-start"}
        flex={"wrap"}
        minW={"90%"}
        flexDirection={"column"}
      >
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
        {/* Circular buttons with Next and Previous buttons */}
        <HStack display={"flex"} flexWrap={"wrap"} marginTop={4} spacing={4}>
          {/* "Previous" button */}
          {currentPosition > 0 && (
            <IconButton
              aria-label="Previous"
              icon={<ChevronLeftIcon />}
              onClick={handlePreviousClick}
              position="absolute"
              left={"10%"}
              top="50%"
              transform="translateY(-50%)"
            />
          )}
          {/* Circular buttons */}
          {renderCircularButtons()}
          {/* "Next" button */}
          {currentPosition < labelsArray.length - totalRows * totalCols && (
            <IconButton
              aria-label="Next"
              icon={<ChevronRightIcon />}
              onClick={handleNextClick}
              position="absolute"
              top="50%"
              right={"10%"}
              transform="translateY(-50%)"
            />
          )}
        </HStack>
      </Container>
    </VStack>
  );
};

export default Locker;
