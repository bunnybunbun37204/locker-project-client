import React from "react";
import { ChakraProvider, Button, ButtonProps } from "@chakra-ui/react";

interface CircularButtonProps extends ButtonProps {
  label: string;
}

const CircularButton: React.FC<CircularButtonProps> = ({ label, ...rest }) => {
  return (
    <ChakraProvider>
      <Button
        size="md"
        boxSize="40px"
        borderRadius="full"
        bg="yellow.400"
        color="white"
        fontSize={14}
        _hover={{ bg: "yellow.500" }}
        {...rest}
      >
        {label}
      </Button>
    </ChakraProvider>
  );
};

export default CircularButton;
