import { Avatar, Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

const Sidebar: FC = () => {
  return (
    <VStack h="full" w="full" py={8} spacing={4}>
      <VStack spacing={4} mb={8} textTransform="lowercase">
        <Avatar size={"xl"} />
        <Text>Shivom Srivastava</Text>
      </VStack>
      {new Array(5).fill(0).map((val, i) => (
        <Link
          style={{
            width: "100%",
            marginRight: 32
          }}
          href={"/bruhh"}
          key={i}
        >
          <Button
          as={"a"}
            w={"full"}
            colorScheme={"yellow"}
            borderStart={"none"}
            borderLeftRadius="none"
            borderRightRadius={"full"}
            height={12}
            textTransform={"uppercase"}
            fontWeight="bold"
          >
            Bruhh
          </Button>
        </Link>
      ))}
    </VStack>
  );
};

export default Sidebar;
