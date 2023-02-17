import { NextPage } from "next";
import { useSwitchNetwork, useWeb3 } from "@3rdweb/hooks";
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Grid,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

const Auth: NextPage = () => {
  const address = useAddress();
  return (
    <Grid placeItems={"center"} h="full">
      <Text fontSize={"4xl"}>Connected: {`${!!address}`} </Text> 
    </Grid>
  );
};

export default Auth;
