import {
  Box,
  Button,
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

const Entries: Array<Partial<Land & LandRequest>> = [
    {
        address: "Sant Nagar Burari",
        area: 300000,
        verified: false,
        price: 324234234,
    },

];

const VerifyLand: NextPage = () => {
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
              <>
                <Tr>
                  <Td>{i}</Td>
                  <Td>{entry.landId}</Td>
                  <Td>{entry.sellerAddress}</Td>
                  <Td>{100000}</Td>
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
              </>
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
export default VerifyLand;
