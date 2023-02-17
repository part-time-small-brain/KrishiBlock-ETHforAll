import {
  VStack,
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Image,
  BoxProps,
} from "@chakra-ui/react";
import { FC } from "react";

const Card: FC<Partial<Land> & { openModal: (x: Partial<Land>) => void }> = ({
  area = 2500,
  unit = "sq.ft",
  address = "Sant Nagar, Burari, Delhi",
  onSale = false,
  image = "https://placekitten.com/600/800",
  openModal,
}) => {
  return (
    <VStack w={"80"} minH={"48"} p={4} py={8} rounded="xl">
      <Box position={"relative"} w="full">
        <Image
          alt="Property"
          w="full"
          h={32}
          objectFit="cover"
          src={image}
          rounded={"xl"}
        />
      </Box>
      <Flex display={"inline-flex"} alignItems="center" gap={2}>
        <Text fontSize={"xl"}>{area}</Text>
        <Text>{unit}</Text>
      </Flex>
      <Text textTransform={"capitalize"}>{address}</Text>
      <Button variant={"solid"} onClick={() => openModal({area, unit, address})}>
        View Details
      </Button>
    </VStack>
  );
};

export default Card;
