/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Divider, Heading, Link, Text, Tooltip, VStack } from '@chakra-ui/react';
import { QueryErrorResetBoundary, useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import useWeb3Store from '../../utils/web3store';

const LekhpalHome: NextPage = () => {
  const [contract, connectedAccount, balance] = useWeb3Store(
    (state) => [state.contract, state.connectedAccount, state.balance],
    shallow
  );
  const query = useQuery({
    queryKey: ['lekhpalInfo'],
    queryFn: async () => {
      const userInfo = await contract?.lekhpalMapping(connectedAccount);
      return userInfo || {
        name: 'Krishi Block Lekhpal',
        age: 20,
        designation: 'None',
        city: 'None'
      };
    }
  });
  useEffect(() => {
    query.refetch();
  }, [contract]);
  if (query.isLoading) return <>Loading Profile....</>;
  return (
    <Box p={4}>
      <Heading fontSize={'4xl'}>
        Lekhpal
      </Heading>
      <Divider my={4} />
      <VStack alignItems={'start'} gap={2}>
        <Text display={'inline-flex'} gap={2} w="full" fontSize={'2xl'}>
          {query.data?.name}, {JSON.parse(query.data?.age)}
        </Text>
        <Text>{connectedAccount}</Text>
        <Text>{balance}</Text>
        <Text>{query.data?.designation}</Text>
        <Text>{query.data?.city}</Text>
      </VStack>
    </Box>
  );
};
export default LekhpalHome;
