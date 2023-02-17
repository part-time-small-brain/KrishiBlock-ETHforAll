import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import Layout from "../components/Layout";
import "@fontsource/josefin-sans";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useMetaMask from "../utils/hooks/useMetaMask";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isDashboard, setIsDashboard] = useState<boolean>(false);
  const { isConnected } = useMetaMask();
  useEffect(() => {
    if (router.pathname !== "/") setIsDashboard(true);
    else setIsDashboard(false);
  }, [router.pathname]);
  useEffect(() => {
    if (!isConnected) router.push("/");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);
  return (
    <ChakraProvider theme={theme}>
      {!isDashboard ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ChakraProvider>
  );
}

export default MyApp;
