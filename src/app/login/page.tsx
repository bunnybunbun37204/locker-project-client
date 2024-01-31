"use client";

import {
  Container,
  Image,
  VStack,
  Heading,
  Text,
  Box,
  Checkbox,
  HStack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
} from "@chakra-ui/react";
import { IconLocker } from "../components/Logo";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sendRequest2 } from "../lib/fetcher";

const Login = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("ticket") || "";

  const router = useRouter();
  const colorForm = "rgba(30, 30, 30, 0.90)";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCheck, setCheckState] = useState(false);
  const [isOpens, setIsOpens] = useState(false);
  const [isAccept, setAcceptState] = useState(false);

  const toggleCheckBox = () => {
    console.log(isCheck);
    setCheckState(!isCheck);
  };

  const toggleCheckBox2 = () => {
    setIsOpens(true);
  };

  const toggleAccept = () => {
    setIsOpens(false);
    setCheckState(true);
    setAcceptState(true);
  };

  const toggleClose = () => {
    setCheckState(false);
    setAcceptState(false);
  };

  useEffect(() => {
    if (search !== "") {
      console.log(search);
      fetch("https://account.it.chula.ac.th/serviceValidation", {
        headers: {
          DeeAppId: "app.vercel.sci-locker",
          DeeAppSecret: "fc42f10ca65ec5a314f3e989dc69a08dc26868814d399c283c5cdb1bce485265ee873fc939305b313df67b155dd29b0a2535c67030fb5fe9e9755007abceace5",
          DeeTicket: search,
        },
        mode: "no-cors",
      })
        .then(async (res) => {
          console.log(await res.json());
          // Handle the response here
          const data = await res.json();
          console.log("DATA : ", data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [search]);

  return (
    <>
      <Container minW="100%" h="100vh" position="relative">
        <Image
          width="84px"
          height="76px"
          src="logo_sci.png"
          alt="Sci Logo"
          position="absolute"
          top="50px"
          left="32px"
        />
        <VStack
          width="300px"
          marginTop="65px"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          align="center"
          justify="center"
        >
          <Heading size="2xl">LOCKER</Heading>
          <Text>สโมสรนิสิตคณะวิทยาศาสตร์</Text>
          <Box h="65px" />
          <IconLocker width="98px" height="98px" />
          <Box h="65px" />
          <HStack justify="space-between">
            <Checkbox
              isChecked={isCheck}
              onChange={toggleCheckBox2}
              _checked={{
                "& .chakra-checkbox__control": {
                  background: "white",
                  borderColor: "black",
                },
              }}
              iconColor="black"
              iconSize={100}
              colorScheme="blackAlpha"
              borderColor={colorForm}
            >
              ยอมรับนโยบายส่วนบุคคล
            </Checkbox>
            <Modal isOpen={isOpens} onClose={onClose} scrollBehavior="inside">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>นโยบายการจัดเก็บข้อมูลส่วนบุคคล</ModalHeader>
                <ModalCloseButton onClick={() => setIsOpens(false)} />
                <ModalBody
                  css={{
                    // Set the max height and enable scrolling
                    maxHeight: "80vh",
                    overflowY: "auto",
                    // Style the scrollbar
                    "&::-webkit-scrollbar": {
                      width: "7px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#4a5568",
                      borderRadius: "17px",
                      "&:hover": {
                        backgroundColor: "#2d3748",
                      },
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#cbd5e0",
                    },
                  }}
                >
                  สโมสรนิสิตคณะวิทยาศาสตร์
                  จุฬาลงกรณ์มหาวิทยาลัยให้ความสำคัญต่อความปลอดภัยของข้อมูลส่วนบุคคลของท่าน
                  และเพื่อช่วยให้เราปกป้องข้อมูลส่วนบุคคล
                  (โดยอ้างอิงนิยามของข้อมูลส่วนบุคคลในพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล
                  พ.ศ. 2562) ของท่านให้ปลอดภัย
                  ตามมาตรฐานสูงสุดสอดคล้องกับพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล
                  พ.ศ. 2562 สโมสรนิสิตคณะวิทยาศาสตร์
                  จุฬาลงกรณ์มหาวิทยาลัยขอความยินยอมจากท่านเพื่อการดำเนินการลงประชามติสำหรับนิสิตคณะวิทยาศาสตร์
                  รวมถึงบทบาทที่เกี่ยวข้อง
                  ดังนั้นเราได้กำหนดนโยบายการเก็บรวบรวมข้อมูลส่วนบุคคลดังต่อไปนี้
                  เพื่อตรวจสอบสิทธิในการลงประชามติของท่าน
                  เราขอเข้าถึงข้อมูลส่วนบุคคลของท่านผ่านระบบ Chula Single
                  Sign-On (Chula SSO) ซึ่งรวมถึงชื่อ รหัสประจำตัวนิสิต
                  ปีการศึกษา และคณะที่ท่านสังกัด
                  โดยมีเพียงรหัสประจำตัวนิสิตของท่านที่จะถูกบันทึกลงในระบบเพื่อป้องกันไม่ให้มีการลงคะแนนซ้ำซ้อน
                  อย่างไรก็ตาม ระบบจะไม่เปิดเผยว่าท่านได้ลงคะแนนให้กับตัวเลือกใด
                  ภายหลังจากประกาศผลประชามติอย่างเป็นทางการในช่องทางที่ได้ประกาศไว้แล้ว
                  เพื่อเป็นการยืนยันว่าข้อมูลส่วนบุคคลของท่านจะได้รับการปกป้องและไม่ถูกนำไปใช้เพื่อวัตถุประสงค์อื่นใดนอกจากการลงประชามติเท่านั้น
                  เพื่อปรับปรุงความถูกต้องของข้อมูลในระบบ
                  เราอาจเก็บข้อมูลการใช้งานผ่านระบบคอมพิวเตอร์หรืออุปกรณ์ที่ใช้ในการเข้าถึงเว็บไซต์
                  เช่น ประเภทของเบราว์เซอร์และคุกกี้
                  ข้อมูลเหล่านี้จะช่วยให้เราเข้าใจวิธีการใช้งานเว็บไซต์ของท่านและปรับปรุงประสบการณ์การใช้งานของท่านให้ดียิ่งขึ้น
                  ขอให้ท่านยอมรับและเห็นด้วยกับเงื่อนไขและข้อกำหนดที่ระบุในนโยบายความเป็นส่วนตัวนี้
                  เพื่อเข้าใช้งานระบบลงประชามติ นโยบายนี้อาจมีการเปลี่ยนแปลง
                  และการแก้ไขใด ๆ
                  จะถูกแจ้งให้ท่านทราบผ่านช่องทางการประชาสัมพันธ์ของสโมสรฯ
                  หากท่านมีข้อสงสัยหรือข้อคำถาม กรุณาติดต่อEmail:
                  smovidyachula@gmail.comFacebook: สโมสรนิสิตคณะวิทยาศาสตร์
                  จุฬาลงกรณ์มหาวิทยาลัย - CU SmovidyaInstagram:
                  @smovidya_official
                </ModalBody>

                <ModalFooter>
                  <Flex
                    justify="center"
                    align="center"
                    w="100%" // Make sure it takes full width
                  >
                    <Button
                      background="rgba(30, 30, 30, 0.90)"
                      borderRadius="17px"
                      color="white"
                      onClick={toggleAccept}
                    >
                      ยอมรับ
                    </Button>
                  </Flex>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </HStack>
          <Button
            marginTop="20px"
            background="rgba(30, 30, 30, 0.90)"
            color="white"
            borderRadius="17px"
            isDisabled={!isAccept}
            onClick={() =>
              router.push(
                "https://account.it.chula.ac.th/login?service=https://sci-locker.vercel.app"
              )
            }
          >
            เข้าสู่ระบบผ่าน Chula SSO
          </Button>
        </VStack>
      </Container>
    </>
  );
};

export default Login;
