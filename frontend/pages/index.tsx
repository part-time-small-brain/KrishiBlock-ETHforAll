import {
  Button,
  ButtonProps,
  Grid,
  Heading,
  HStack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserModal, AdminModal } from "../components/Home";
import useUserStore from "../utils/store";
import useWeb3Store from "../utils/web3store";
import shallow from "zustand/shallow";

const props: ButtonProps = {
  width: "100px",
  colorScheme: "yellow",
  rounded: "xl",
};

const Home: NextPage = () => {
  const [isConnected] = useWeb3Store((state) => [state.isConnected], shallow);
  const router = useRouter();

  const {
    isOpen: adminIsOpen,
    onOpen: adminOnOpen,
    onClose: adminOnClose,
  } = useDisclosure();
  const {
    isOpen: userIsOpen,
    onOpen: userOnOpen,
    onClose: userOnClose,
  } = useDisclosure();

  return (
    <Grid
      height={"100vh"}
      placeItems="center"
      bg="gray.900"
      textColor={"white"}
    >
      <VStack gap={4}>
        <Heading
          color="yellow.300"
          display={"inline-flex"}
          alignItems="center"
          fontFamily={"body"}
          gap={"2"}
          userSelect="none"
          fontSize={"7xl"}
        >
          krishi
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={"white"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{
              width: "64px",
              height: "64px",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
            />
          </svg>
        </Heading>
        {!isConnected ? (
          <HStack>
            <Button {...props} onClick={adminOnOpen}>
              Admin
            </Button>
            <Button {...props} onClick={userOnOpen}>
              User
            </Button>
          </HStack>
        ) : (
          <Button colorScheme={"yellow"} onClick={() => router.push("/sdm")}>
            Go to your Dashboard
          </Button>
        )}
      </VStack>
      <AdminModal onClose={adminOnClose} isOpen={adminIsOpen} />
      <UserModal onClose={userOnClose} isOpen={userIsOpen} />
    </Grid>
  );
};
export default Home;
