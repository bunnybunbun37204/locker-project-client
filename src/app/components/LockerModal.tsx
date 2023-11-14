import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { sendRequest } from "../lib/fetcher";

interface Locker {
  locker_id: string;
  locker_status: string;
}

const LockerModal = () => {
  async function fetcher(url: string) {
    return fetch(url).then((res) => res.json());
  }

  const { data, mutate, isLoading } = useSWR(
    "http://localhost:8000/getData",
    fetcher
  );

  const { trigger } = useSWRMutation(
    "http://localhost:8000/booked",
    sendRequest /* options */
  );

  const toggleButton = async (locker_id: string) => {
    // Using try-catch to handle errors during the booking process
    try {
      // Trigger the mutation and await the result
      const result = await trigger({
        username: "game",
        locker_id: locker_id,
        isBooked: "TRUE",
      });

      // If booking is successful, close the modal and update the state
      if (result?.success) {
        // Refetch data to update the state after booking
        console.log("success");
      }
    } catch (error) {
      // Handle errors if needed
      console.error("Booking failed:", error);
    }
  };

  // Explicitly specifying the type of lockers as an array of Locker
  const [lockers, setLockers] = useState<Locker[]>([]);

  const convertDisable = (status: string) => {
    return status === "TRUE";
  };

  useEffect(() => {
    // Check if data and data.data are available before setting lockers
    if (data && data.data) {
      setLockers(data.data);
    }
  }, [mutate, data]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="yellow" variant="solid" onClick={onOpen}>
        Booking
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="4" direction="column">
              {lockers.length > 0 ? (
                lockers.map((locker) => (
                  <Box
                    key={locker.locker_id}
                    py={{ base: "0", sm: "8" }}
                    px={{ base: "4", sm: "10" }}
                    bg={{ base: "transparent", sm: "rgb(253 230 138)" }}
                    boxShadow={{ base: "none", sm: "md" }}
                    borderRadius={{ base: "none", sm: "xl" }}
                  >
                    <Stack spacing="100" direction="row">
                      <Text>{locker.locker_id}</Text>
                      <Button
                        onClick={() =>
                          toggleButton(locker.locker_id).then(() => mutate())
                        } // Wrap in an arrow function
                        colorScheme="yellow"
                        variant="solid"
                        isDisabled={convertDisable(locker.locker_status)}
                      >
                        Booking!!
                      </Button>
                    </Stack>
                  </Box>
                ))
              ) : (
                <Text>No lockers available</Text>
              )}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LockerModal;
