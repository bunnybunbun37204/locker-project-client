import { Box, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { GrayBall, YellowBall } from "./Logo";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ZoneCard: React.FC<{ label: string, date: Date[], zone: string }> = ({ label, date , zone}) => {
    const [isHovered, setHovered] = useState(false);
    const router = useRouter();

  return (
    <>
      <Box
      as="button"
        marginTop={3}
        display={"flex"}
        height={290}
        padding={"15px 0px"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        gap={2}
        borderRadius={25}
        border={"0.2px solid"}
      bg={isHovered ? "gray.200" : "gray.100"} // Change background color on hover
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() =>              router.push(
            `/locker?selectedDate=${date.toString()}&selectedZone=${zone}`
          )}
      >
        <HStack spacing={170} marginLeft={15} marginRight={15}>
          <VStack>
            <Heading>{label}</Heading>
            <Text>MHMK ชั้น 2</Text>
          </VStack>
          <VStack>
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
            <Text>40</Text>
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
            <GrayBall width={8.872} height={9} strokeWidth={0.2} />
            <Text>3</Text>
          </Box>
          </VStack>
        </HStack>
        <Image
        marginLeft={15}
        borderRadius={25}
        src="booked-locker.png"
        alt="locker"
        width="250px"
        height="180px"
      />
      </Box>
    </>
  );
};

export default ZoneCard;
