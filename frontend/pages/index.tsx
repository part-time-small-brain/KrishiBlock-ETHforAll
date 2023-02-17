import {
  Button,
  ButtonProps,
  Grid,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { UserModal, AdminModal } from "../components/Home";
import useMetaMask from "../utils/hooks/useMetaMask";
import useWeb3 from "../utils/hooks/useWeb3";

const props: ButtonProps = {
  width: "100px",
  colorScheme: "yellow",
  rounded: "xl",
};

const Home: NextPage = () => {
  const { isConnected, connectedAccount } = useMetaMask();
  const { contract, balance } = useWeb3();
  const [sdmHai, setSDMHai] = useState(false);
  const isSDM = async () => {
    if (contract && connectedAccount) {
      const isSDM = await contract.isSDM(connectedAccount);
      setSDMHai(isSDM);
    }
  };
  useEffect(() => {
    console.log("nice");
    isSDM();
  });
  const { isOpen: adminIsOpen, onOpen: adminOnOpen, onClose: adminOnClose, } = useDisclosure();
  const { isOpen: userIsOpen, onOpen: userOnOpen, onClose: userOnClose } = useDisclosure();
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
        <Text>
          {isConnected && (sdmHai ? "YES Acount is SDM" : "NO NHI hai")}
        </Text>
        <Text>
          Very Epic Smoodh app, Can get you a lot of bitches. A lot of &apos;em.
        </Text>
        <HStack>
          <Button {...props} onClick={adminOnOpen}>
            Admin
          </Button>
          <Button {...props} onClick={userOnOpen}>
            User
          </Button>
        </HStack>
      </VStack>
      <AdminModal onClose={adminOnClose} isOpen={adminIsOpen} />
      <UserModal onClose={userOnClose} isOpen={userIsOpen} />
    </Grid>
  );
};
export default Home;
