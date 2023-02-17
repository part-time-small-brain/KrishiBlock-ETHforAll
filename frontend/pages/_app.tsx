import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import Layout from "../components/Layout";
import "@fontsource/josefin-sans";
import "@fontsource/yeseva-one";
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
  );
}

export default MyApp;
