"use client";

import {
  Container,
  Image,
  Divider,
  HStack,
  Text,
  VStack,
  Button,
  Center, // Import the Center component
} from "@chakra-ui/react";

const Booking = () => {
  return (
    <>
      <VStack>
        <Image
          width="84px"
          height="76px"
          src="logo_sci.png"
          alt="Sci Logo"
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
        <VStack>
          <Center>
            {/* Wrap the HStack with the Center component */}
            <HStack spacing={11} marginTop={30}>
              <Button borderRadius={33} background="#F7CF47" width={125}>
                <Text fontSize={25} fontStyle="normal">
                  DATE
                </Text>
              </Button>
              <Button borderRadius={33} background="#F7CF47" width={125}>
                <Text fontSize={25} fontStyle="normal">
                  ZONE
                </Text>
              </Button>
              <Button borderRadius={33} background="#F7CF47" >
                <Text fontSize={25} fontStyle="normal">
                  SITE&RULES
                </Text>
              </Button>
            </HStack>
          </Center>
        </VStack>
        <Container marginTop={57} marginLeft={175} marginRight={174}>
          <Container marginLeft={20} marginRight={20}>
            <Text>Hello</Text>
          </Container>
        </Container>
      </VStack>
    </>
  );
};

export default Booking;
