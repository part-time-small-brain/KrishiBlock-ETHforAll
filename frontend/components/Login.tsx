import { useSwitchNetwork, useWeb3 } from "@3rdweb/hooks";
import { AspectRatio, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

export default function Login() {
  const { address, chainId, connectWallet, disconnectWallet } = useWeb3();
  const { canAttemptSwitch } = useSwitchNetwork();

  return (
    <>
      <Text fontWeight="bold" fontSize="24px" alignSelf="center">
        Current Status
      </Text>
      <Text>
        <strong>ChainID:</strong> {chainId || "N/A"}
      </Text>
      <Text>
        <strong>Can Switch:</strong> {`${!!canAttemptSwitch}`}
      </Text>
      <Text>
        <strong>Connected:</strong> {`${!!address}`}
      </Text>
      <Text>
        <strong>Wallet Address:</strong>{" "}
        {address ? `${address.slice(0, 16)}...` : "N/A"}
      </Text>

      {address && (
        <Button
          onClick={disconnectWallet}
          mt="8px"
          colorScheme={"yellow"}
          bg="white"
          w={"full"}
        >
          Disconnect
        </Button>
      )}

      <Text
        fontWeight="bold"
        fontSize="24px"
        alignSelf="center"
        mt="32px"
        mb="8px"
      >
        Connect Wallet
      </Text>

      <Button
        mb="8px"
        size="lg"
        bg="white"
        iconSpacing="auto"
        colorScheme={"yellow"}
        w={"full"}
        rightIcon={
          <AspectRatio ratio={1} w={6}>
            <Image
              src="https://thirdweb.com/logos/metamask-fox.svg"
              alt="meta mask fox"
            />
          </AspectRatio>
        }
        onClick={() => connectWallet("injected")}
      >
        MetaMask
      </Button>
    </>
  );
}
