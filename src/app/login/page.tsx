"use client";

import {
  Container,
  Image,
  VStack,
  Heading,
  Text,
  Box,
  PopoverFooter,
  PopoverBody,
  PopoverCloseButton,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  Checkbox,
  PopoverTrigger,
  HStack,
  Popover,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { IconLocker } from "../components/Logo";
import { useState } from "react";

const Login = () => {
  const colorForm = "blackAlpha.700";
  const [isCheck, setCheckState] = useState(false);
  const [isAccept, setAcceptState] = useState(false);

  const toggleCheckBox = () => {
    console.log(isCheck);
    setCheckState(!isCheck);
  };

  const toggleAccept = () => {
    setCheckState(false);
    setAcceptState(true);
  };

  const toggleClose = () => {
    setCheckState(false);
    setAcceptState(false);
  };

  return (
    <>
      <Container minW="100%" h="100vh" position="relative">
        <Image
          src="logo_sci.png"
          alt="Sci Logo"
          position="absolute"
          top="50px"
          left="32px"
        />
        <VStack
        marginTop="70px"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          align="center"
          justify="center"
          spacing={4}
        >
          <Heading size="2xl">LOCKER</Heading>
          <Text>สโมสรนิสิตคณะวิทยาศาสตร์</Text>
          <Box h="60px" />
          <IconLocker width="98px" height="98px" />
          <Box h="60px" />
          <HStack justify="space-between">
            <Popover
              returnFocusOnClose={false}
              isOpen={isCheck}
              onClose={toggleClose}
              placement="top-start"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Checkbox
                  isChecked={isAccept}
                  onChange={toggleCheckBox}
                  colorScheme="black"
                  borderColor={colorForm}
                >
                  <Text>ยอมรับนโยบายส่วนบุคคล</Text>
                </Checkbox>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight="semibold">
                  Confirmation
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>ยอมรับเถอะพี่</PopoverBody>
                <PopoverFooter display="flex" justifyContent="flex-end">
                  <ButtonGroup size="sm">
                    <Button colorScheme="red" onClick={toggleAccept}>
                      Apply
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </HStack>
          <Button background="rgba(30, 30, 30, 0.90)" color="white" borderRadius="17px" isDisabled={!isAccept}>
                เข้าสู่ระบบผ่าน Chula SSO
              </Button>
        </VStack>
      </Container>
    </>
  );
};

export default Login;
