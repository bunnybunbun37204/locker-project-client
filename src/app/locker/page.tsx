"use client";

import {
  Box,
  Button,
  Circle,
  Container,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const Locker = () => {
  const searchParams = useSearchParams();

  
  const numRows = 6;
  const numCols = 12;

  const circleNumbers = Array.from(
    { length: numRows * numCols },
    (_, index) => index + 1
  );

  // Array of circle names to be displayed in gray
  const grayCircleNames = ["A003", "A004", "A009", "A048"];

  const handleCircleClick = (circleNumber : number) => {
    console.log(
      `Clicked on circle A${circleNumber.toString().padStart(3, "0")}`
    );
    // Add your logic for handling circle click here
  };

  return (
    <>
      <Container marginTop={125} marginLeft={150}>
        <VStack spacing={4}>
          <Heading>{searchParams.get('selectedZone')} </Heading>
          {/* <Text>Selected Date: {searchParams.get('selectedDate')}</Text> */}

          <HStack spacing={3} marginLeft={20}>
            {/* Available */}
            <Box
              borderRadius={15}
              border="1px solid"
              width={100}
              alignContent={"center"}
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            >
              <HStack spacing={2}>
                <Circle
                  size={4}
                  bg="#FFCC00"
                  border="1px solid"
                  marginLeft={1}
                />
                <Text fontSize="sm">Available</Text>
              </HStack>
            </Box>

            {/* Unavailable */}
            <Box
              borderRadius={15}
              border="1px solid"
              width={130}
              alignContent={"center"}
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            >
              <HStack spacing={2}>
                <Circle
                  size={4}
                  bg="#DFDFDF"
                  border="1px solid"
                  marginLeft={1}
                />
                <Text fontSize="sm">Unavailable</Text>
              </HStack>
            </Box>
          </HStack>

          {/* Grid of Circles */}
          <Box
            borderRadius={15}
            border="1px solid"
            width="100%"
            bg={"gray.100"}
            alignContent={"center"}
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
          >
            <HStack spacing={1} wrap="wrap">
              {circleNumbers.map((number) => (
                <div key={number} onClick={() => handleCircleClick(number)}>
                  <Button
                  width={8}
                  height={8}
                    bg={
                      grayCircleNames.includes(
                        `A${number.toString().padStart(3, "0")}`
                      )
                        ? "#DFDFDF"
                        : "#FFCC00"
                    }
                    border="1px solid"
                    margin={1}
                    boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
                    onClick={() => handleCircleClick(number)}
                  >
                    <Text fontSize="xs">
                      A{number.toString().padStart(3, "0")}
                    </Text>
                  </Button>
                </div>
              ))}
            </HStack>
          </Box>
          <Button>จอง</Button>
        </VStack>
      </Container>
    </>
  );
};

export default Locker;
