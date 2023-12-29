import { Box, Container, Image, Text } from "@chakra-ui/react";

const loading = () => {
  return (
    <Container minW="100%" marginTop="50px" marginLeft="32px">
      <Box width="84px" height="76px">
        <Image src="loading.gif" alt="Sci logo"/>
      </Box>
    </Container>
  );
};

export default loading;
