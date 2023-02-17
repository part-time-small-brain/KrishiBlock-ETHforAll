import {
  Box,
  Button,
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

const Entries: Array<Partial<any>> = [
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

const TransferOwnership: NextPage = () => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Land Id</Th>
            <Th>Owner Address</Th>
            <Th>Price (in ₹)</Th>
            <Th>Make Payment</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Entries.map((entry, i) => {
            return (
                <Tr key={i}>
                  <Td>{i}</Td>
                  <Td>{entry.landId}</Td>
                  <Td>{entry.sellerAddress}</Td>
                  <Td>{100000}</Td>
                  <Td>
                    <IconButton
                      colorScheme="yellow"
                      aria-label="Make Payment"
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
                            d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      }
                    />
                  </Td>
                </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>#</Th>
            <Th>Land Id</Th>
            <Th>Owner Address</Th>
            <Th>Price (in Rs)</Th>
            <Th>Make Payment</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
export default TransferOwnership;
