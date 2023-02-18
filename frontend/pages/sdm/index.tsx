import { Box, Heading, Divider, VStack, Text } from '@chakra-ui/react';
import { Tooltip } from 'leaflet';
import { NextPage } from 'next';
import Link from 'next/link';
import shallow from 'zustand/shallow';
import useWeb3Store from '../../utils/web3store';

const OwnerHome: NextPage = () => {
  const [contract, connectedAccount, balance] = useWeb3Store(
    (state) => [state.contract, state.connectedAccount, state.balance],
    shallow
  );
  return (
    <Box>
      <Heading fontSize={'4xl'}>SDM</Heading>
      <Divider my={4} />
      <VStack alignItems={'start'} gap={2}>
        <Text>{connectedAccount}</Text>
        <Text>{balance}</Text>
      </VStack>
    </Box>
  );
};

export default OwnerHome;
