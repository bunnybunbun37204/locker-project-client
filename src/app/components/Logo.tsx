import { Container, chakra, shouldForwardProp, Image } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

export const Logo = () => {
  const breakPoint : string[] = ["40vh", "30vh", "40vh"];
  return (
    <Container h={breakPoint} display="flex" alignItems="center" justifyContent="center">
      <ChakraBox
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        // @ts-ignore no problem in operation, although type error appears.
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        padding="2"
        bgGradient="linear(to-l, rgb(253 224 71),  rgb(234 179 8))"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100px"
        height="100px"
      >
        <Image 
        alt='Logo' 
        boxSize='10vh'
        src='https://sv1.picz.in.th/images/2023/11/09/ddy11WW.png'/>
      </ChakraBox>
    </Container>
  )
}