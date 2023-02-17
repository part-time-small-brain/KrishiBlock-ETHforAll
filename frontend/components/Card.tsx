import { VStack, Box, Flex, HStack, Button, Text, Image, BoxProps } from "@chakra-ui/react";
import { FC } from "react";

const Card: FC<Partial<Land>> = ({
  area = 2500,
  unit = "sq.ft",
  address = "Sant Nagar, Burari, Delhi",
  onSale = false,
  image = "https://placekitten.com/600/800",
}) => {
  return (
    <VStack
      w={"80"}
      minH={"48"}
      p={4}
      py={8}
      rounded="xl"
    >
      <Box position={"relative"} w="full">
        <Image
          alt="Property"
          w="full"
          h={32}
          objectFit="cover"
          src={image}
          rounded={"xl"}
        />
        <Verified
          verified="yes"
          props={{ position: "absolute", top: -4, right: -4 }}
        />
      </Box>
      <Flex display={"inline-flex"} alignItems="center" gap={2}>
        <Text fontSize={"xl"}>{area}</Text>
        <Text>{unit}</Text>
      </Flex>
      <Text textTransform={"capitalize"}>{address}</Text>
      <HStack>
        <Button disabled={onSale} colorScheme={"red"}>
          {onSale ? "Sell" : "For Sale"}
        </Button>
        <Button variant={"ghost"}>View Details</Button>
      </HStack>
    </VStack>
  );
};
const Verified: FC<{ verified: "yes" | "pending"; props?: BoxProps }> = ({
  verified,
  props,
}) => {
  return (
    <Box color={"twitter.300"} {...props} w={"16"} h={"16"}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <path
          fillRule="evenodd"
          d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    </Box>
  );
};

export default Card;