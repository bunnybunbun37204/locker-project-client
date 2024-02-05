"use client";

import React, { useEffect, useState } from "react";
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
import { getCookie, setCookie } from "cookies-next";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";

interface Locker {
  locker_number: string;
  locker_status: string;
  borrowed_in: Date;
  borrowed_out: Date;
  user_id: string;
  user_email: string;
}

const Locker = () => {
  const searchParams = useSearchParams();
  const selectedZone = searchParams.get("selectedZone") || "A";
  const selectedDate = searchParams.get("selectedDate");
  const [locker, setLocker] = useState<Locker[]>([]);
  const [email, setEmail] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [locker_id, setLockerId] = useState("");
  const router = useRouter();

  const totalRowsDesktop = 6;
  const totalColsDesktop = 12;
  const totalRowsMobile = 6;
  const totalColsMobile = 6;

  async function sendRequest(
    url: string,
    {
      arg,
    }: {
      arg: {
        user_email: string;
        locker_id: string;
        isBooked: string;
        zone: string;
        borrowed_in: string;
        borrowed_out: string;
      };
    }
  ) {
    console.log("ARG ", JSON.stringify(arg));

    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: "POST",
      body: JSON.stringify(arg),
    }).then((res) => res.json());
  }

  const { trigger } = useSWRMutation(
    "https://locker-vidya-api.netlify.app/.netlify/functions/api/locker/booked",
    sendRequest
  );

  const useOnSubmit = async () => {
    const date = selectedDate?.split("-") || ["", ""];

    await trigger({
      user_email: "email",
      locker_id: currentLocker,
      zone: selectedZone,
      isBooked: "UnAvailable",
      borrowed_in: date[0].trim(),
      borrowed_out: date[1].trim(),
    });

    setCookie("isBooked", true);
    setCookie("locker_id", currentLocker);
    router.push(
      `/callbackBooking?selectedDate=${selectedDate}&selectedZone=${selectedZone}`
    );
  };

  const useUnSubmit = async () => {
    await trigger({
      user_email: email,
      locker_id: locker_id,
      zone: selectedZone,
      isBooked: "Available",
      borrowed_in: "",
      borrowed_out: "",
    });

    setCookie("isBooked", false);
    setCookie("locker_id", "");
    router.push(
      `/callbackBooking?selectedDate=${selectedDate}&selectedZone=${selectedZone}`
    );
  };

  // Calculate total rows and columns based on breakpoint
  const totalRows =
    useBreakpointValue({ base: totalRowsMobile, md: totalRowsDesktop }) || 0;
  const totalCols =
    useBreakpointValue({ base: totalColsMobile, md: totalColsDesktop }) || 0;

  // State for tracking the current position
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentLocker, setCurrentLocker] = useState(`${selectedZone}00`);

  useEffect(() => {
    setCurrentLocker(`${selectedZone}00`);
    const cookie = localStorage.getItem("datajaa") || "";
    const isBook = getCookie("isBooked") || "false";
    const locker_id = getCookie("locker_id") || "";
    const email = getCookie("email") || "";
    setEmail(email);
    setLockerId(locker_id);
    setLocker(JSON.parse(cookie));
    setIsBooked(isBook === "true");
  }, [selectedZone]);

  const renderCircularButtons = (): JSX.Element[] => {
    const buttons: JSX.Element[] = [];
    let index = currentPosition;

    for (let row = 0; row < totalRows; row++) {
      const rowButtons: JSX.Element[] = [];
      for (let col = 0; col < totalCols; col++) {
        const label = locker[index];
        if (label) {
          const isDisabled = label.locker_status !== "Available"; // You can set your logic for disabled buttons here
          rowButtons.push(
            <CircularButton
              key={`${row}-${col}`}
              label={label.locker_number}
              isDisabled={isDisabled}
              onClick={() => setCurrentLocker(label.locker_number)}
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
    const maxPosition = locker.length - totalRows * totalCols;
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
            {currentPosition < locker.length - totalRows * totalCols && (
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
            isDisabled={isBooked}
            borderRadius={17}
            onClick={useOnSubmit}
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
          {locker_id !== "" && (
            <Text fontSize={14}>Locker number : {locker_id}</Text>
          )}
          {locker_id === "" && (
            <Text fontSize={14}>Locker number : {currentLocker}</Text>
          )}
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
            <Text>{selectedDate}</Text>
          </Box>
        </Box>
        <Button
          background={"blackAlpha.800"}
          width={{ base: 240, md: 348 }}
          alignItems={"center"}
          color={"white"}
          isDisabled={!isBooked}
          borderRadius={17}
          marginTop={4}
          onClick={useUnSubmit}
        >
          ยกเลิกการจอง
        </Button>
      </VStack>
    </HStack>
  );
};

export default Locker;
