import { Box, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

interface NavbarProps {
  currentRoute?: string;
}

const Navbar: FC<NavbarProps> = ({ currentRoute }) => {
  return (
    <Box h="full" w="full" display={"flex"} gap={16} alignItems="center" p={8}>
      <Heading
        color="yellow.300"
        display={"inline-flex"}
        alignItems="center"
        fontFamily={"body"}
        gap={"2"}
        userSelect="none"
      >
        krishi
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={"white"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          style={{
            width: "40px",
            height: "40px"
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          />
        </svg>
      </Heading>
      {currentRoute && <Text textTransform={"lowercase"}>{currentRoute}</Text>}
    </Box>
  );
};

export default Navbar;
