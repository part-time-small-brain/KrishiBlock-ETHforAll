import { Box, Button, HStack, IconButton, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";

const Entries: Array<Partial<User>> = [
  {
    address: "",
    adhar: 234234123412,
    document: "13423423",
    name: "Shivom Srivastava",
    pan: "OIdfasd32",
    verified: false,
  },
  {
    address: "",
    adhar: 234234123412,
    document: "13423423",
    name: "Shubhom Srivastava",
    pan: "OIdfasd32",
    verified: false,
  },
  {
    address: "",
    adhar: 234234123412,
    document: "13423423",
    name: "Diptesh Choudhuri",
    pan: "OIdfasd32",
    verified: false,
  },
  {
    address: "",
    adhar: 234234123412,
    document: "13423423",
    name: "Land Srivastava",
    pan: "OIdfasd32",
    verified: false,
  },
];

const VerifyUser: NextPage = () => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Address</Th>
            <Th>Name</Th>
            <Th>Adhar</Th>
            <Th>Pan</Th>
            <Th>Document</Th>
            <Th>Verify</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Entries.map((entry, i) => {
            return (
                <Tr key={i}>
                  <Td>{i}</Td>
                  <Td>{entry.address}</Td>
                  <Td>{entry.name}</Td>
                  <Td>{entry.adhar}</Td>
                  <Td>{entry.pan}</Td>
                  <Td>
                    <Link href={"https://shivom.me"}>view document</Link>
                  </Td>
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
            <Th>Address</Th>
            <Th>Name</Th>
            <Th>Adhar</Th>
            <Th>Pan</Th>
            <Th>Document</Th>
            <Th>Verify</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
export default VerifyUser;
