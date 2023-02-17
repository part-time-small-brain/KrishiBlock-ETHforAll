import { Box, BoxProps, Grid } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const defaultProps: BoxProps = {
    fontWeight: "bold",
  };
  const address = useAddress();
  const router = useRouter();
  return (
    <Grid
      templateAreas={
        "'navbar navbar navbar' 'sidebar main main' 'sidebar footer footer'"
      }
      minHeight="100vh"
      gridTemplateRows={"100px auto 100px"}
      gridTemplateColumns={"300px auto"}
      textColor={"gray.50"}
    >
      <Box {...defaultProps} gridArea={"navbar"} bg="gray.900">
        <Navbar currentRoute={router.pathname} />
      </Box>
      <Box {...defaultProps} gridArea={"sidebar"} bg="gray.900">
        <Sidebar />
      </Box>
      <Box {...defaultProps} gridArea={"main"} bg="gray.900" p={8}>
        {children}
      </Box>
      <Box {...defaultProps} gridArea={"footer"} bg="gray.900">
        <Footer />
      </Box>
    </Grid>
  );
};

export default Layout;
