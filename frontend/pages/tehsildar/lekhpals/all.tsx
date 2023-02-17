import { Box, Table, Tbody, Td, Tfoot, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useState } from 'react';
import shallow from 'zustand/shallow';

import useWeb3Store from '../../../utils/web3store';

const AllLandInspectors: NextPage = () => {
  const [addresses, setAddresses] = useState<Array<string>>([]);
  const [isConnected, connectedAccount, contract] = useWeb3Store(
    (state) => [state.isConnected, state.connectedAccount, state.contract],
    shallow
  );
  const toast = useToast();
  const query = useQuery(
    ["getLekhpal"],
    async () => {
      console.log("tryna query getlekhpal");
      const data = await contract?.getLekhpalList();
      return data;
    },
    {
      onSuccess: (data) => {
        setAddresses(data);
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
  if (query.isLoading) {
    return <Box p={8}>Loading Lekhpals...</Box>;
  }
  return (
    <Box p={8}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>S.no</Th>
            <Th>address</Th>
            <Th>action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {addresses.map((address, i) => {
            return (
              <Tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{address}</Td>
                <Td>button</Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>S.no</Th>
            <Th>address</Th>
            <Th>action</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};

export default AllLandInspectors;
