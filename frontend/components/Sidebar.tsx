import { Avatar, Box, Button, Stack, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import Link from "next/link";
import Login from "./Login";
import { useRouter } from "next/router";
import RoleLinks from "../utils/links";
import useMetaMask from "../utils/hooks/useMetaMask";

const Sidebar: FC = () => {
  const router = useRouter();
  const { connectWallet, connectedAccount, isConnected } = useMetaMask();
  return (
    <VStack w="full" pt={8} spacing={4} pos={"sticky"} top={0}>
      {RoleLinks.get("user")!.map((val, i) => (
        <Link
          style={{
            width: "100%",
            marginRight: 32,
            marginBottom:
              i === RoleLinks.get("user")!.length - 1 ? "auto" : "none",
          }}
          href={val.href}
          key={i}
        >
          <Button
            w={"full"}
            colorScheme={"yellow"}
            borderStart={"none"}
            borderLeftRadius="none"
            borderRightRadius={"full"}
            height={12}
            textTransform={"capitalize"}
          >
            {val.name}
          </Button>
        </Link>
      ))}
      <Stack
        cursor={"pointer"}
        position={"fixed"}
        bottom="0"
        left={0}
        gap={4}
        direction={"row"}
        p={8}
        alignItems={"center"}
        justify={"start"}
        onClick={() => connectWallet()}
      >
        <Avatar src="https://bit.ly/broken-link" />
        <VStack
          h="full"
          alignItems={"start"}
          justifyContent={"center"}
          lineHeight={0}
          gap={2}
        >
          {/* <Text>Shivom Srivastava</Text> */}
          {false ? (
            <>
              <Text>{connectedAccount?.slice(0, 10)}</Text>
              <Text fontSize={"sm"}>user</Text>
            </>
          ) : (
            <Text>Connect Wallet</Text>
          )}
        </VStack>
      </Stack>
    </VStack>
  );
};

export default Sidebar;
