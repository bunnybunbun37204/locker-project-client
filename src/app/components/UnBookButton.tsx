import {
    Button,
  } from "@chakra-ui/react";
  import useSWRMutation from "swr/mutation";
  import { sendRequest } from "../lib/fetcher";
  import { useCookies } from "react-cookie";
  import { useRouter } from "next/navigation";
  
  const UnBookedBtn = () => {
    async function fetcher(url: string) {
      return fetch(url).then((res) => res.json());
    }
    const [cookies, setCookie] = useCookies(["user","brownie"]);
    const router = useRouter();
  
    const { trigger } = useSWRMutation(
      "http://localhost:8000/booked",
      sendRequest /* options */
    );
  
    const toggleButton = async () => {
        console.log("id ",cookies.user);
        console.log("brownie ", cookies.brownie);
        
        
      // Using try-catch to handle errors during the booking process
      try {
        // Trigger the mutation and await the result
        const result = await trigger({
          user_id: cookies.user,
          locker_id: cookies.brownie,
          isBooked: "FALSE",
        });
  
        // If booking is successful, close the modal and update the state
        if (result?.success) {
          // Refetch data to update the state after booking
          console.log("success");
          setCookie("brownie","0");
          router.refresh();
  
        }
      } catch (error) {
        // Handle errors if needed
        console.error("Booking failed:", error);
      }
    };
  
    return (
      <>
        <Button colorScheme="yellow" variant="solid" onClick={toggleButton}>
          UnBooking
        </Button>
      </>
    );
  };
  
  export default UnBookedBtn;
  