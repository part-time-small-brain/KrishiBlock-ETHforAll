import { Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useWeb3Store from "../utils/web3store";

const ErrorPage: NextPage = () => {
  const router = useRouter();
  const code = router.query.code || 404;
  const isConnected = useWeb3Store((state) => state.isConnected);
  useEffect(() => {
    if (!isConnected) router.push("/");
  }, [isConnected]);
  return (
    <>
      <Grid
        height={"100vh"}
        placeItems="center"
        bg="gray.900"
        textColor={"white"}
      >
        <VStack>
          <Heading>{code}</Heading>
          <Text>
            Permission Error, Please disconnect your
            wallet to continue
          </Text>
        </VStack>
      </Grid>
    </>
  );
};

export default ErrorPage;
