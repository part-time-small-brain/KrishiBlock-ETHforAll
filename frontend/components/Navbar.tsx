import { Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

interface NavbarProps {
  currentRoute?: string;
}

const Navbar: FC<NavbarProps> = ({ currentRoute }) => {
  return (
    <Box h="full" w="full" display={"flex"} gap={16} alignItems="center" p={8}>
      <Heading fontFamily={"body"}>krishi block</Heading>
      {currentRoute && <Text textTransform={"lowercase"}>{currentRoute}</Text>}
      <Link href={"/owner"}>owner dashboard</Link>
      <Link href={"/owner/land-owners/add"}>add</Link>
      <Link href={"/owner/land-owners/all"}>all</Link>
    </Box>
  );
};

export default Navbar;
