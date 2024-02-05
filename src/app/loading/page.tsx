import { Box, Center, Image } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center height="100vh">
      <Box width={48} height={48} display="flex" justifyContent="center" alignItems="center">
        <Image src="loading.gif" alt="Sci logo" />
      </Box>
    </Center>
  );
};

export default Loading;
