import { Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";

interface NavbarProps {
  currentRoute?: string;
}

const Navbar: FC<NavbarProps> = ({ currentRoute }) => {
  return (
    <Box h="full" w="full" display={"flex"} gap={16} alignItems="center" p={8}>
      <Heading fontFamily={"body"}>krishi block</Heading>
      {currentRoute && <Text textTransform={"lowercase"}>{currentRoute}</Text>}
    </Box>
  );
};

export default Navbar;
