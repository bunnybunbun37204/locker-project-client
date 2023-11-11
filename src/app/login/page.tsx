"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stack,
} from "@chakra-ui/react";
import { Logo, Logo1 } from "../components/Logo";
import { PasswordField } from "../components/PasswordField";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";

const LogIn = () => {
  const router = useRouter();
  const colorForm = "blackAlpha.700";
  const [isCheck, setCheckState] = useState(false);
  const [isAccept, setAcceptState] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUserId = (e: {
    target: { value: SetStateAction<string> };
  }) => setUserId(e.target.value);
  const handleChangePassword = (e: {
    target: { value: SetStateAction<string> };
  }) => setPassword(e.target.value);

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

  const toggleButton = async() => {
    if (isAccept) {
      console.log(userId);
      console.log(password);
      console.log("Is Check Naja");
      const result = await trigger({username : userId, password : password});
      if (error) {
        console.log("Error");
      }
      console.log(result);      
      
      router.push(`/users/${result.username}`);
    }
  };

  async function sendRequest(url : string, { arg }: { arg: { username: string, password : string}}) {
    console.log("ARG ",arg);
    
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body: JSON.stringify(arg)
    }).then(res => res.json())
  }

  const { data, error, trigger, isMutating } = useSWRMutation('http://localhost:8000/getUser', sendRequest, /* options */)

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
          bg={{ base: "transparent", sm: "rgb(253 230 138)"}}
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
                <Input
                  id="email"
                  type="email"
                  value={userId}
                  onChange={handleChangeUserId}
                />
              </FormControl>
              <PasswordField value={password} onChange={handleChangePassword} />
            </Stack>
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
                    colorScheme="yellow"
                    borderColor={colorForm}
                  >
                    accept our policy
                  </Checkbox>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader fontWeight="semibold">
                    Confirmation
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>ยอมรับซะไอ่สัส</PopoverBody>
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
            <Stack spacing="6">
              <Button isDisabled={!isAccept} onClick={toggleButton}>
                Sign in
              </Button>
              {isMutating && <h1>Loading</h1>}
              {error && <h1>Error</h1>}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default LogIn;
