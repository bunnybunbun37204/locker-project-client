"use client";

import {
  Stack,
  Heading,
  Container,
  Box,
  CircularProgress,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import useSWR from "swr";
import LockerModal from "../components/LockerModal";
import UnBookedBtn from "../components/UnBookButton";

const User = () => {
  async function fetcher(url: string) {
    console.log(url);

    return fetch(url).then((res) => res.json());
  }

  const router = useRouter();
  const [cookies] = useCookies(["user", "brownie"]);
  const { data, error, mutate, isLoading } = useSWR(
    cookies.user ? `http://localhost:8000/getUser/${cookies.user}` : null,
    fetcher // Assume you have a fetcher function defined elsewhere
  );
  useEffect(() => {
    console.log("Brownie", cookies.brownie);
    
    if (!cookies.user) {
      router.push("/login");
    }

    mutate();
  }, [mutate, cookies.user, router, cookies.brownie]);

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "rgb(253 230 138)" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              {error && <h1>Error.....</h1>}
              {isLoading && (
                <CircularProgress color="#facc15" isIndeterminate />
              )}
              {data && (
                <>
                  <Heading>Hello {data.username}</Heading>
                  {data.locker.status === "FALSE" && (
                    <Stack direction="row" spacing={4} align="center">
                      <Text fontSize="xl">Dont have locker yet? booking</Text>
                      <LockerModal />
                    </Stack>
                  )}
                  {data.locker.status !== "FALSE" && (
                    <Stack direction="row" spacing={4} align="center">
                      <Text fontSize="xl">Booked data {data.locker.locker_id}</Text>
                      <UnBookedBtn/>
                    </Stack>
                  )}
                </>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default User;
