import {
  Box,
  Button,
  Flex,
  Link,
  List,
  ListIcon,
  ListItem,
  MenuIcon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StatDownArrow,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import Card from "../../../components/Card";
import ViewDetail from "../../../components/ViewLand";

const Gallery: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalLand, setModalLand] = useState<Partial<Land>>({});
  return (
    <>
      <Wrap>
        {[...Array(10)].map((_, i) => (
          <>
            <WrapItem key={i}>
              <Card
                openModal={(land) => {
                  setModalLand(land);
                  onOpen();
                }}
              />
            </WrapItem>
          </>
        ))}
      </Wrap>
      <ViewDetail data={modalLand} isOpen={isOpen} onClose={onClose} />
    </>
  );
};


export default Gallery;
