import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { NextPage } from "next";

const Entries: Array<Partial<LandRequest>> = [
  {
    sellerAddress:
      "3ed4aff1a8ff8e28df3cd307112f9166886edcc85a27136908e3b1687b111f89",
    buyerAddress:
      "3ed4aff1a8ff8e28df3cd307112f9166886edcc85a27136908e3b1687b111f89",
    landId: 1,
    payment: false,
    status: 0,
  },
  {
    sellerAddress:
      "3ed4aff1a8ff8e28df3cd307112f9166886edcc85a27136908e3b1687b111f89",
    buyerAddress:
      "3ed4aff1a8ff8e28df3cd307112f9166886edcc85a27136908e3b1687b111f89",
    landId: 1,
    payment: false,
    status: 0,
  },
  {
    sellerAddress:
      "3ed4aff1a8ff8e28df3cd307112f9166886edcc85a27136908e3b1687b111f89",
    buyerAddress:
      "3ed4aff1a8ff8e28df3cd307112f9166886edcc85a27136908e3b1687b111f89",
    landId: 1,
    payment: false,
    status: 0,
  },
  {
    sellerAddress:
      "3ed4aff1a8ff8e28df3cd307112f9166886edcc85a27136908e3b1687b111f89",
    buyerAddress:
      "3ed4aff1a8ff8e28df3cd307112f9166886edcc85a27136908e3b1687b111f89",
    landId: 1,
    payment: false,
    status: 0,
  },
];

const Home: NextPage = () => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Land Id</Th>
            <Th>Buyer Address</Th>
            <Th>Status</Th>
            <Th>Payment Done</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Entries.map((entry, i) => {
            return (
                <Tr key={i}>
                  <Td>{i}</Td>
                  <Td>{entry.landId}</Td>
                  <Td>{entry.buyerAddress}</Td>
                  <Td>{entry.status}</Td>
                  <Td>{entry.payment}</Td>
                  <Td>
                    <HStack>
                      <IconButton
                        colorScheme="green"
                        aria-label="Accept"
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
                      <IconButton
                        colorScheme="red"
                        aria-label="Reject"
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            style={{
                              width: 20,
                              height: 20,
                            }}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
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
            <Th>#</Th>
            <Th>Land Id</Th>
            <Th>Buyer Address</Th>
            <Th>Status</Th>
            <Th>Payment Done</Th>
            <Th>Action</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
export default Home;
