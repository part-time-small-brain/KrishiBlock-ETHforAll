import {
  Box,
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { FC, useState } from "react";

import useWeb3Store from "../../../utils/web3store";
const Entries: Array<Partial<Land>> = [
  {
    address: "Sant Nagar Burari",
    area: 300000,
    verified: false,
    owner: "23423424",
    id: 1,
  },
];

const VerifyLand: NextPage = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState<Array<any>>([]);
  const [activeId, setActiveId] = useState<number>();
  const [land, setLand] = useState({
    id: 0,
    area: 0,
    landAddress: "",
    ownerAddress: "",
    landPrice: "",
    propertyPID: "",
    physicalSurveyNumber: "",
    document: "",
    isLandVerified: false,
  });
  const contract = useWeb3Store((state) => state.contract);
  const toast = useToast();
  const query = useQuery(
    ["getUnverifiedLands"],
    async () => {
      console.log("tryna query unverified lands");
      const unverifiedLands = await contract?.getUnverifiedLands();
      return unverifiedLands;
    },
    {
      onSuccess: (data) => {
        setUsers([...data]);
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: "Couldn't fetch data",
          duration: 1000,
          status: "error",
          isClosable: true,
        });
      },
    }
  );
  const getLand = useMutation(
    async () => {
      const landInfo = await contract?.lands(activeId);
      return landInfo;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        
        setLand(data);
        onOpen();
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: "Couldn't fetch data",
          duration: 1000,
          status: "error",
          isClosable: true,
        });
      },
    }
  );

  const verifyMutation = useMutation(
    async () => {
      const tx = await contract?.verifyLand(activeId);
      console.log("Verifying land ", activeId);
      await tx.wait();
      return tx.hash;
    },
    {
      onSuccess: (data) => {
        toast({
          title: "Success",
          description: `land verified ${data.slice(0, 10)}`,
          duration: 1000,
          status: "success",
          isClosable: true,
        });
        query.refetch();
        onClose();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Couldn't Verify Land",
          duration: 3000,
          status: "error",
        });
        onClose();
      },
    }
  );
  if (query.isLoading) {
    return <Box p={8}>Loading Unverified Lands...</Box>;
  }
  if (users.length === 0) return <Box p={8}>No Unverified Lands :)</Box>;

  return (
    <>
      <TableContainer maxW={"container.sm"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Land Id</Th>
              <Th>Verify</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((id) => {
              return (
                <Tr key={id}>
                  <Td>{id}</Td>
                  <Td>
                    <HStack>
                      <IconButton
                        colorScheme="green"
                        aria-label="verify"
                        isLoading={getLand.isLoading && activeId == id}
                        onClick={() => {
                          console.log("verify clicked for", id);
                          setActiveId(id);
                          getLand.mutate();
                        }}
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            style={{
                              width: 20,
                              height: 20,
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        }
                      />
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Land Id</Th>
              <Th>Verify</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      {activeId && (
        <VerifyLandModal
          data={land}
          loading={verifyMutation.isLoading}
          callback={() => verifyMutation.mutate()}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};
export const VerifyLandModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  callback: () => void;
  loading: boolean;
  data: any;
}> = ({ isOpen, onClose, callback, loading, data }) => {
  const toast = useToast();
  const contract = useWeb3Store((state) => state.contract);
  const [land, setLand] = useState({
    id: 0,
    area: 0,
    landAddress: "",
    ownerAddress: "",
    landPrice: "",
    propertyPID: "",
    physicalSurveyNumber: "",
    document: "",
    isLandVerified: false,
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Verify Land</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontWeight={"bold"}>
            <Text mb="1rem">Verify Land {JSON.parse(data.id)}</Text>
            <Text mb="1rem">OwnerAddress: {(data.ownerAddress)}</Text>
            <Text mb="1rem">Price: {JSON.parse(data.landPrice)}</Text>
            <Text mb="1rem">Price: {JSON.parse(data.landPrice)}</Text>
            <Text mb="1rem">PID: {JSON.parse(data.propertyPID)}</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              onClick={callback}
              rounded={"full"}
              isLoading={loading}
              loadingText="Verifying User"
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default VerifyLand;
