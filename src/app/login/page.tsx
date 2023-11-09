"use client";

import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Logo } from "../components/Logo";
import { OAuthButtonGroup } from "../components/OAuthButtonGroup";
import { PasswordField } from "../components/PasswordField";
import { useState } from "react";

const LogIn = () => {
  const colorForm = "blackAlpha.700";
  const [isCheck, setCheckState] = useState(false);

  const toggleCheckBox = () => {
    console.log(isCheck);
    setCheckState(!isCheck);

  };

  const toggleButton = () => {
    if (isCheck) {
      console.log("Is Check Naja");
      
    }
  }

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Log in to your account with CU NET
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "rgb(253 230 138)" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel
                  borderColor={colorForm}
                  htmlFor="email"
                  colorScheme="red"
                >
                  Student Id
                </FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <PasswordField />
            </Stack>
            <HStack justify="space-between">
              <Checkbox
                onChange={toggleCheckBox}
                colorScheme="yellow"
                borderColor={colorForm}
              >
                accept our policy
              </Checkbox>
            </HStack>
            <Stack spacing="6">
              <Button isDisabled={!isCheck} onClick={toggleButton}>Sign in</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default LogIn;
